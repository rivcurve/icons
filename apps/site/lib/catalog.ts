import data from "../../../generated/icons.json";

const shapeTags = ["path", "circle", "ellipse", "rect", "line", "polyline", "polygon"] as const;
type ShapeTag = typeof shapeTags[number];

export type IconRecord = {
  name: string;
  category: string;
  keywords: string[];
  shapes: { tag: ShapeTag; attrs: Record<string, string> }[];
};

export const categories = data.categories.map(({ id, label }) => ({ id, label }));

function normalizeShape(shape: { tag: string; attrs: Record<string, string | undefined> }) {
  const tag = shapeTags.find((allowed) => allowed === shape.tag);
  if (!tag) throw new Error(`Unsupported SVG element: ${shape.tag}`);

  const entries = Object.entries(shape.attrs).filter(
    (entry): entry is [string, string] => entry[1] !== undefined,
  );
  return { tag, attrs: Object.fromEntries(entries) };
}

export const icons: IconRecord[] = data.categories.flatMap(({ id, icons }) =>
  icons.map(({ name, keywords, shapes }) => ({
    name, category: id, keywords, shapes: shapes.map(normalizeShape),
  })),
);

const byName = new Map(icons.map((icon) => [icon.name, icon]));
export const svgAttributes = data.svgAttrs;

export function findIcon(name: string) {
  return byName.get(name);
}

export function searchIcons(query: string, category = "all") {
  const normalized = query.trim().toLowerCase().replace(/\s+/g, " ");
  const terms = normalized.split(" ").filter(Boolean);
  const results = icons.filter(({ name, category: group, keywords }) => {
    if (category !== "all" && category !== group) return false;
    const searchable = `${name} ${keywords.join(" ")}`;
    return terms.every((term) => searchable.includes(term));
  });
  if (!normalized) return results;

  const target = normalized.replace(/ /g, "-");
  const rank = (name: string) => name === target ? 0 : name.startsWith(target) ? 1 : 2;
  return results.sort((first, second) => rank(first.name) - rank(second.name));
}

function formatAttrs(attrs: Record<string, string | number>) {
  return Object.entries(attrs)
    .map(([key, value]) => `${key}="${String(value).replace(/[&"<>]/g, (char) => ({
      "&": "&amp;", '"': "&quot;", "<": "&lt;", ">": "&gt;",
    })[char] ?? char)}"`)
    .join(" ");
}

export function iconSvg(icon: IconRecord, size = 24) {
  const root = formatAttrs({ xmlns: "http://www.w3.org/2000/svg", width: size, height: size, ...svgAttributes });
  const shapes = icon.shapes.map(({ tag, attrs }) => `  <${tag} ${formatAttrs(attrs)}/>`).join("\n");
  return `<svg ${root}>\n${shapes}\n</svg>\n`;
}
