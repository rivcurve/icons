# @rivcurve/icons

[Rivcurve](https://github.com/rivcurve/icons) interface icons as plain SVG files. Every icon sits on a 24 × 24 grid with a 2-unit rounded stroke and inherits `currentColor`.

> **Alpha.** Icon names may still change before 1.0.

```sh
npm install @rivcurve/icons
```

```js
import downloadUrl from "@rivcurve/icons/svg/refined/download.svg";
```

Files live at `svg/refined/<name>.svg`. `metadata.json` lists every icon with its category and search keywords.

When an icon sits next to text that already names the action, mark it decorative: `alt=""` on an `<img>` or `aria-hidden="true"` on inline SVG.

## License

MIT
