# Rivcurve

Open-source interface icons. Clear at small sizes.

Rivcurve currently ships 108 icons in the **Refined** style: a 24 × 24 grid, a 2-unit rounded stroke and `currentColor`. A **Filled** style with one-to-one coverage and the SVG and React packages are on the [roadmap](docs/ROADMAP.md).

> **Status: alpha.** `@rivcurve/icons` and `@rivcurve/react` 0.1 are on npm. Icon names may still change before 1.0. Browse the catalog at [rivcurve.pages.dev](https://rivcurve.pages.dev).

```sh
npm install @rivcurve/react
```

## Repository layout

- `icons/<style>/<category>/<name>.svg` holds the editable geometry. Only `refined` exists today.
- `icons.json` is the manifest: categories, order, icon names and search keywords. Names are the public identifiers.
- `generated/icons.json` is the normalized build output that the site and future package generators read. Edit the sources and rebuild it; never edit it by hand.
- `preview.html` is a self-contained catalog for checking icons at 16, 20 and 24 px on light and dark backgrounds. Open `preview.html?qa` for a geometry report.
- `packages/icons` (`@rivcurve/icons`) and `packages/react` (`@rivcurve/react`) are generated from `generated/icons.json` by `scripts/packages.mjs`. Their build output is not committed.
- `apps/site` is the Next.js website with the searchable catalog and the docs.

## Build and check

Requires Python 3.9+ and Node.js 20+.

```sh
npm run icons   # validate SVGs and rebuild generated/icons.json and preview.html
npm test        # check generated data, build both packages and verify them
```

`npm test` confirms that every React component renders the same geometry as its SVG file, that icons are decorative by default, and that props reach the `<svg>` element. CI runs the same checks and builds the site.

## Run the site

```sh
npm install
npm run dev
```

The site opens at [localhost:3000](http://localhost:3000). `npm run build` exports a static site to `apps/site/out/`. See [deployment](docs/DEPLOYMENT.md) for Cloudflare Pages.

The site uses [Arc UI](https://uiarc.dev/components) components mapped to Rivcurve tokens; see the [integration notes](apps/site/components/arc/README.md) for their sources and license.

## Contributing

Icon requests and bug reports are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Refined design rules](DESIGN_GUIDELINES.md) first.

## License

[MIT](LICENSE) © vend1k12 and Rivcurve contributors.
