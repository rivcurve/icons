# Contributing to Rivcurve

Start with an icon request or bug report in [GitHub Issues](https://github.com/vend1k12/rivcurve/issues). Name the UI action you want to represent and include a small example of where the icon would appear. For an existing icon, include its catalog name and the size at which it is hard to recognize.

## Work on the icons

- Read [the Refined design rules](DESIGN_GUIDELINES.md).
- Edit the canonical SVG in `icons/<category>/`. Keep the public name stable for a correction. Add a manifest entry when proposing a new name.
- Run `python3 scripts/icons.py build` to regenerate catalog data and `python3 scripts/icons.py check` to verify the files.
- Compare the before and after at 16, 20 and 24 px, on both light and dark backgrounds. Link those views in the pull request.

## Work on the site

Run `npm ci` and `npm run dev` from the repository root. Keep the shared Rivcurve palette and font, including the light and dark themes. Run `npm run build` to produce the static site in `apps/site/out/`. Keep icon geometry in the canonical SVGs and website examples in the app.

For larger proposals, open an issue before building so the maintainers can agree on the behavior and scope.
