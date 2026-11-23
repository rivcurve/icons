# @rivcurve/react

[Rivcurve](https://github.com/rivcurve/icons) interface icons as React components. Every icon sits on a 24 × 24 grid with a 2-unit rounded stroke.

> **Alpha.** Icon names may still change before 1.0.

```sh
npm install @rivcurve/react
```

```jsx
import { FolderOpenIcon } from "@rivcurve/react";

<FolderOpenIcon size={20} />
```

Each icon is its own module, so bundlers keep only the icons you import. Deep imports also work: `@rivcurve/react/icons/folder-open`.

## Props

| Prop | Default | Notes |
| --- | --- | --- |
| `size` | `24` | Width and height. |
| `color` | `currentColor` | Stroke color. |
| `strokeWidth` | `2` | In 24-unit grid space. |
| `title` | — | Accessible name. |

Other SVG props and `ref` pass through to the `<svg>` element.

## Accessibility

Icons are decorative by default and render with `aria-hidden="true"`. Give an icon `title` or `aria-label` when it carries meaning on its own. For an icon-only button, put the name on the button and keep the icon decorative:

```jsx
<button aria-label="Open folder"><FolderOpenIcon /></button>
```

Requires React 18 or newer. Works in React Server Components.

## License

MIT
