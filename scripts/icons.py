#!/usr/bin/env python3
"""Validate the catalog and build framework-neutral geometry and its preview."""
import argparse
import html
import json
import re
import sys
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
NS = "{http://www.w3.org/2000/svg}"
ROOT_ATTRS = {
    "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor",
    "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round",
}
SHAPES = {
    "path": ("d",), "circle": ("cx", "cy", "r"),
    "ellipse": ("cx", "cy", "rx", "ry"), "rect": ("x", "y", "width", "height"),
    "line": ("x1", "y1", "x2", "y2"),
    "polyline": ("points",), "polygon": ("points",),
}
ID = re.compile(r"[a-z][a-z0-9]*(?:-[a-z0-9]+)*")
NUMBER = r"-?(?:\d+(?:\.\d+)?|\.\d+)"
PATH_TOKEN = re.compile(r"[MmZzLlHhVvCcSsQqTtAa]|" + NUMBER)
PATH_ARG_COUNTS = dict(M=2, Z=0, L=2, H=1, V=1, C=6, S=4, Q=4, T=2, A=7)


def require(condition, message):
    if not condition:
        raise ValueError(message)


def validate_path(path):
    tokens = PATH_TOKEN.findall(path)
    require(tokens and tokens[0] in ("M", "m") and
            re.fullmatch(r"[ ,\s]*", PATH_TOKEN.sub("", path)), "malformed path")
    groups = []
    for token in tokens:
        if token.isalpha():
            groups.append((token.upper(), []))
        else:
            groups[-1][1].append(token)
    has_drawing = False
    for command, args in groups:
        arity = PATH_ARG_COUNTS[command]
        if not arity:
            require(not args, "Z takes no parameters")
            continue
        require(args and len(args) % arity == 0, f"wrong parameter count for {command}")
        has_drawing |= command != "M" or len(args) > arity
        if command == "A":
            for index in range(0, len(args), arity):
                require(all(float(value) > 0 for value in args[index:index + 2])
                        and all(flag in ("0", "1") for flag in args[index + 3:index + 5]),
                        "invalid arc radii or flags")
    require(has_drawing, "empty path")


def read_svg(file):
    source = file.read_text(encoding="utf-8")
    require("<!" not in source and "<?" not in source, "markup outside SVG")
    svg = ET.fromstring(source)
    require(svg.tag == NS + "svg" and svg.attrib == ROOT_ATTRS, "invalid root SVG attributes")
    require(len(svg) and not (svg.text or "").strip(), "SVG must contain only geometry")
    shapes = []
    for element in svg:
        tag = element.tag.removeprefix(NS)
        require(element.tag == NS + tag and tag in SHAPES and not len(element)
                and not (element.text or "").strip() and not (element.tail or "").strip(),
                f"disallowed element {element.tag}")
        attrs = element.attrib
        required = set(SHAPES[tag])
        allowed = required | ({"rx", "ry"} if tag == "rect" else set())
        require(required <= attrs.keys() <= allowed, f"invalid attributes on {tag}")
        if tag == "path":
            validate_path(attrs["d"])
        elif "points" in attrs:
            values = re.split(r"[ ,\s]+", attrs["points"].strip())
            require(len(values) >= (6 if tag == "polygon" else 4) and len(values) % 2 == 0
                    and all(re.fullmatch(NUMBER, value) for value in values), "invalid points")
        else:
            require(all(re.fullmatch(NUMBER, value) for value in attrs.values()),
                    f"invalid number in {tag}")
            for key in {"r", "rx", "ry", "width", "height"} & attrs.keys():
                require(float(attrs[key]) > 0, f"{key} must be greater than zero")
        shapes.append({"tag": tag, "attrs": dict(sorted(attrs.items()))})
    return shapes


def load_catalog():
    manifest = json.loads((ROOT / "icons.json").read_text(encoding="utf-8"))
    require(manifest["schemaVersion"] == 2, "unsupported manifest schema version")
    styles = manifest["styles"]
    require(styles == ["refined"], "only the refined style is supported for now")
    categories = manifest["categories"]
    require(isinstance(categories, list) and categories, "the manifest has no categories")
    names, category_ids, paths, geometries = set(), set(), set(), set()
    output = []
    for category in categories:
        category_id = category["id"]
        members = category["icons"]
        require(ID.fullmatch(category_id) and category_id not in category_ids
                and category["label"].strip() and isinstance(members, list) and members,
                f"invalid category {category_id}")
        category_ids.add(category_id)
        records = []
        for entry in members:
            name, keywords = entry["name"], entry["keywords"]
            require(ID.fullmatch(name) and name not in names, f"invalid or duplicate name {name}")
            require(isinstance(keywords, list) and all(
                isinstance(word, str) and re.fullmatch(r"[a-z0-9]+", word) for word in keywords)
                and len(set(keywords)) == len(keywords), f"invalid keywords for {name}")
            names.add(name)
            file = ROOT / "icons" / styles[0] / category_id / f"{name}.svg"
            paths.add(file)
            try:
                shapes = read_svg(file)
                signature = json.dumps(shapes)
                require(signature not in geometries, "duplicate geometry")
            except (OSError, ValueError, ET.ParseError) as error:
                raise ValueError(f"{file.relative_to(ROOT)}: {error}") from error
            geometries.add(signature)
            records.append({"name": name, "keywords": keywords, "shapes": shapes})
        output.append({"id": category_id, "label": category["label"], "icons": records})
    require(set((ROOT / "icons").rglob("*.svg")) == paths, "SVG files outside the manifest")
    return {"schemaVersion": 2, "styles": styles, "svgAttrs": ROOT_ATTRS, "categories": output}


def attributes(attrs):
    return " ".join(f'{key}="{html.escape(value, quote=True)}"' for key, value in attrs.items())


def preview(catalog):
    sections = []
    for category in catalog["categories"]:
        cards = []
        for icon in category["icons"]:
            geometry = "".join(f'<{shape["tag"]} {attributes(shape["attrs"])}/>'
                               for shape in icon["shapes"])
            sample = "".join(
                f'<span><svg {attributes(ROOT_ATTRS)} width="{size}" height="{size}" '
                f'aria-hidden="true" focusable="false">{geometry}</svg><small>{size}</small></span>'
                for size in (16, 20, 24)
            )
            name = icon["name"]
            cards.append(f'<li data-name="{name}"><code>{name}</code>'
                         f'<div class="samples light">{sample}</div>'
                         f'<div class="samples dark">{sample}</div></li>')
        label = html.escape(category["label"])
        sections.append(f'<section><h2>{label}</h2><ul>{"".join(cards)}</ul></section>')
    template = (ROOT / "scripts" / "preview.template.html").read_text(encoding="utf-8")
    return template.replace("<!-- CATALOG -->", "\n".join(sections))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action", choices=("check", "build"))
    args = parser.parse_args()
    try:
        catalog = load_catalog()
        outputs = {
            ROOT / "generated" / "icons.json":
                json.dumps(catalog, ensure_ascii=False, indent=2) + "\n",
            ROOT / "preview.html": preview(catalog),
        }
        for file, content in outputs.items():
            if args.action == "build":
                file.parent.mkdir(parents=True, exist_ok=True)
                file.write_text(content, encoding="utf-8")
            else:
                require(file.is_file() and file.read_text(encoding="utf-8") == content,
                        f"{file.relative_to(ROOT)} is stale, run build")
    except (OSError, ValueError, KeyError, TypeError) as error:
        print(error, file=sys.stderr)
        return 1
    category_count = len(catalog["categories"])
    icon_count = sum(len(category["icons"]) for category in catalog["categories"])
    print(f"{icon_count} SVG · {category_count} categories · JSON and HTML in sync")
    return 0


if __name__ == "__main__":
    sys.exit(main())
