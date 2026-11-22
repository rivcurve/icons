# Arc UI components for Rivcurve

Button, Search Field, Segmented Control, Select and the shared motion presets come from the [public Arc UI registry](https://uiarc.dev/docs/installation). See [registry-sources.json](registry-sources.json) for the exact items and checksums, and [the MIT notice](../../public/notices/arc-ui.txt) for attribution.

`rivcurve.css` maps component variables to our active Rivcurve palette and layout tokens. It replaces the default Arc theme. Search Field and Select use Refined glyphs so the website does not need a second icon library.

When updating an item, compare its registry source and preserve our token mappings and Refined icon adaptations.
