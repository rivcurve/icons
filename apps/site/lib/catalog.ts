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
  actions: "Actions",
  people: "People",
  communication: "Communication",
  finance: "Finance",
  "files-data": "Files & data",
  development: "Development",
  security: "Security",
  media: "Media",
  utility: "Utilities",
  status: "Status",
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

const searchAliases: Record<string, string> = {
  home: "house start", "map-pin": "location marker", search: "find magnifying glass",
  users: "group people", wallet: "money payment", banknote: "cash bill money",
  download: "save export", upload: "send import", database: "storage data sql",
  "file-text": "document text", image: "photo picture", archive: "box storage",
  "git-branch": "version control branch", bug: "debug error",
  plus: "add create new", minus: "remove subtract", settings: "preferences gear configure",
  "more-horizontal": "overflow ellipsis actions", "more-vertical": "overflow ellipsis actions",
  edit: "pencil modify", copy: "duplicate clipboard", trash: "delete remove bin",
  refresh: "reload retry", mail: "email envelope", "chat-dots": "message conversation",
  "bell-off": "mute notification", share: "send export", "at-sign": "mention email",
  calendar: "date schedule event", clock: "time history", globe: "world language internet",
  bookmark: "save favorite", lock: "privacy password", "lock-open": "unlock public",
  "shield-check": "security safe verified", eye: "show visible", "eye-off": "hide password hidden",
  camera: "photo take picture", video: "record film", microphone: "audio voice mic",
  info: "information about", "circle-help": "question support", "triangle-alert": "warning caution",
  "circle-check": "success done complete", "circle-x": "error failed cancel",
  loader: "spinner progress loading", "circle-minus": "remove unavailable",
  "octagon-alert": "danger error warning",
};

export function searchIcons(query: string, category = "all") {
  const normalized = query.trim().toLowerCase().replace(/\s+/g, " ");
  const terms = normalized.split(" ").filter(Boolean);
  const results = icons.filter(({ name, category: group }) => {
    if (category !== "all" && category !== group) return false;
    const searchable = `${name} ${searchAliases[name] ?? ""}`;
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
