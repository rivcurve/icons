#!/usr/bin/env node
// Generate the publishable SVG and React packages from generated/icons.json.
// Run `python3 scripts/icons.py build` first; this script only reads its output.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(readFileSync(join(root, "generated", "icons.json"), "utf8"));
if (catalog.schemaVersion !== 2) throw new Error("generated/icons.json: unsupported schema version");

const style = "refined";
const icons = catalog.categories.flatMap((category) =>
  category.icons.map((icon) => ({ ...icon, category: category.id })),
);

const pascal = (name) => name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("");
const componentName = (name) => `${pascal(name)}Icon`;

const seen = new Map();
for (const { name } of icons) {
  const component = componentName(name);
  if (seen.has(component)) throw new Error(`${name} and ${seen.get(component)} both map to ${component}`);
  seen.set(component, name);
}

const escape = (value) => String(value).replace(/[&"<>]/g, (char) => (
  { "&": "&amp;", '"': "&quot;", "<": "&lt;", ">": "&gt;" }[char]
));
const attrs = (record) => Object.entries(record).map(([key, value]) => `${key}="${escape(value)}"`).join(" ");

function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

function reset(dir) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

function copyLicense(pkg) {
  cpSync(join(root, "LICENSE"), join(pkg, "LICENSE"));
}

// ---- @rivcurve/icons: plain SVG files and metadata ----------------------------------------

function buildSvgPackage() {
  const pkg = join(root, "packages", "icons");
  reset(join(pkg, "svg"));
  const rootAttrs = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, ...catalog.svgAttrs };
  for (const icon of icons) {
    const shapes = icon.shapes.map(({ tag, attrs: shape }) => `  <${tag} ${attrs(shape)}/>`).join("\n");
    write(join(pkg, "svg", style, `${icon.name}.svg`), `<svg ${attrs(rootAttrs)}>\n${shapes}\n</svg>\n`);
  }
  const metadata = {
    schemaVersion: 1,
    styles: catalog.styles,
    categories: catalog.categories.map(({ id, label }) => ({ id, label })),
    icons: icons.map(({ name, category, keywords }) => ({ name, category, keywords })),
  };
  write(join(pkg, "metadata.json"), JSON.stringify(metadata, null, 2) + "\n");
  copyLicense(pkg);
}

// ---- @rivcurve/react: one ES module per icon ----------------------------------------------

const reactProp = (key) => key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

const createIconSource = `import { createElement, forwardRef } from "react";

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function createIcon(displayName, shapes) {
  const Icon = forwardRef(function Icon(
    { size = 24, color = "currentColor", strokeWidth = 2, title, children, ...rest },
    ref,
  ) {
    const labelled = title != null || rest["aria-label"] != null || rest["aria-labelledby"] != null;
    return createElement(
      "svg",
      {
        ...base,
        width: size,
        height: size,
        stroke: color,
        strokeWidth,
        "aria-hidden": labelled ? undefined : "true",
        role: labelled ? "img" : undefined,
        ...rest,
        ref,
      },
      title != null ? createElement("title", null, title) : null,
      ...shapes.map(([tag, attrs], key) => createElement(tag, { key, ...attrs })),
      children,
    );
  });
  Icon.displayName = displayName;
  return Icon;
}
`;

const typesSource = `import type { ForwardRefExoticComponent, ReactNode, RefAttributes, SVGProps } from "react";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref" | "children"> {
  /** Width and height. Defaults to 24. */
  size?: number | string;
  /** Stroke color. Defaults to currentColor. */
  color?: string;
  /** Stroke width in 24-unit grid space. Defaults to 2. */
  strokeWidth?: number | string;
  /** Accessible name. Without a title or aria-label the icon is hidden from assistive technology. */
  title?: string;
  children?: ReactNode;
}

export type RivcurveIcon = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
`;

function buildReactPackage() {
  const pkg = join(root, "packages", "react");
  const dist = join(pkg, "dist");
  reset(dist);
  write(join(dist, "create-icon.js"), createIconSource);
  write(join(dist, "types.d.ts"), typesSource);

  const indexJs = [];
  const indexDts = ['export type { IconProps, RivcurveIcon } from "./types.js";'];
  for (const icon of icons) {
    const component = componentName(icon.name);
    const shapes = icon.shapes.map(({ tag, attrs: shape }) => [
      tag,
      Object.fromEntries(Object.entries(shape).map(([key, value]) => [reactProp(key), value])),
    ]);
    write(
      join(dist, "icons", `${icon.name}.js`),
      `import { createIcon } from "../create-icon.js";\n\n` +
      `export const ${component} = /* @__PURE__ */ createIcon(${JSON.stringify(component)}, ${JSON.stringify(shapes)});\n`,
    );
    write(
      join(dist, "icons", `${icon.name}.d.ts`),
      `import type { RivcurveIcon } from "../types.js";\n\nexport declare const ${component}: RivcurveIcon;\n`,
    );
    indexJs.push(`export { ${component} } from "./icons/${icon.name}.js";`);
    indexDts.push(`export { ${component} } from "./icons/${icon.name}.js";`);
  }
  write(join(dist, "index.js"), indexJs.join("\n") + "\n");
  write(join(dist, "index.d.ts"), indexDts.join("\n") + "\n");
  copyLicense(pkg);
}

buildSvgPackage();
buildReactPackage();
console.log(`${icons.length} icons · @rivcurve/icons and @rivcurve/react generated`);
