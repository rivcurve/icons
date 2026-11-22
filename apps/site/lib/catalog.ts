import data from "../../../generated/icons.json";

const shapeTags = ["path", "circle", "ellipse", "rect", "line", "polyline", "polygon"] as const;
type ShapeTag = typeof shapeTags[number];

export type IconRecord = {
  name: string;
  category: string;
  shapes: { tag: ShapeTag; attrs: Record<string, string> }[];
};

const categoryLabels: Record<string, string> = {
  navigation: "Navigation",
  people: "People",
  finance: "Finance",
  "files-data": "Files & data",
  development: "Development",
};

export const categories = data.categories.map(({ id, label }) => ({
  id,
  label: categoryLabels[id] ?? label,
}));

function normalizeShape(shape: { tag: string; attrs: Record<string, string | undefined> }) {
  const tag = shapeTags.find((allowed) => allowed === shape.tag);
  if (!tag) throw new Error(`Unsupported SVG element: ${shape.tag}`);

  const entries = Object.entries(shape.attrs).filter(
    (entry): entry is [string, string] => entry[1] !== undefined,
  );
  return { tag, attrs: Object.fromEntries(entries) };
}

export const icons: IconRecord[] = data.categories.flatMap(({ id, icons }) =>
  icons.map(({ name, shapes }) => ({ name, category: id, shapes: shapes.map(normalizeShape) })),
);

const byName = new Map(icons.map((icon) => [icon.name, icon]));
export const svgAttributes = data.svgAttrs;

export function findIcon(name: string) {
  return byName.get(name);
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
