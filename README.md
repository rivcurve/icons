# Rivcurve

Open-source interface icons. Clear at small sizes.

Rivcurve currently ships 108 icons in the **Refined** style: a 24 × 24 grid, a 2-unit rounded stroke and `currentColor`. A **Filled** style with one-to-one coverage and the SVG and React packages are on the [roadmap](docs/ROADMAP.md).

> **Status: pre-alpha.** No packages are published yet. The React and Vue examples in the docs show the planned API.

## Repository layout

- `icons/<style>/<category>/<name>.svg` holds the editable geometry. Only `refined` exists today.
- `icons.json` is the manifest: categories, order, icon names and search keywords. Names are the public identifiers.
- `generated/icons.json` is the normalized build output that the site and future package generators read. Edit the sources and rebuild it; never edit it by hand.
- `preview.html` is a self-contained catalog for checking icons at 16, 20 and 24 px on light and dark backgrounds. Open `preview.html?qa` for a geometry report.
- `apps/site` is the Next.js website with the searchable catalog and the docs.

## Build and check the icons

Requires Python 3.9 or newer.

```sh
python3 scripts/icons.py build
python3 scripts/icons.py check
```

`check` validates every SVG and the manifest, and verifies that both generated files are up to date.

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
