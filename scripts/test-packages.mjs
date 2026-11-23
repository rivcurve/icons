#!/usr/bin/env node
// Verify the generated packages: React output matches the SVG package geometry,
// accessibility defaults hold, and props reach the <svg> element.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const metadata = JSON.parse(readFileSync(join(root, "packages/icons/metadata.json"), "utf8"));
const react = await import(pathToFileURL(join(root, "packages/react/dist/index.js")).href);

const pascal = (name) => name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("");
const shapesOf = (svg) => [...svg.matchAll(/<(path|circle|ellipse|rect|line|polyline|polygon) ([^>]*?)\/?>/g)]
  .map(([, tag, attrs]) => `${tag} ${[...attrs.matchAll(/([a-z-]+)="([^"]*)"/g)]
    .map(([, key, value]) => `${key}=${value}`).sort().join(" ")}`);

assert.equal(Object.keys(react).length, metadata.icons.length, "every icon is exported once");

for (const { name } of metadata.icons) {
  const Icon = react[`${pascal(name)}Icon`];
  assert.ok(Icon, `${name}: missing React export`);
  const svgFile = readFileSync(join(root, "packages/icons/svg/refined", `${name}.svg`), "utf8");
  const markup = renderToStaticMarkup(createElement(Icon));
  assert.deepEqual(shapesOf(markup), shapesOf(svgFile), `${name}: React geometry differs from SVG`);
  assert.match(markup, /aria-hidden="true"/, `${name}: decorative by default`);
  assert.match(markup, /width="24" height="24"/, `${name}: default size`);
  assert.match(markup, /stroke="currentColor" stroke-width="2"/, `${name}: default stroke`);
}

const { DownloadIcon } = react;
const titled = renderToStaticMarkup(createElement(DownloadIcon, { title: "Download" }));
assert.match(titled, /role="img"/);
assert.match(titled, /<title>Download<\/title>/);
assert.doesNotMatch(titled, /aria-hidden/);

const labelled = renderToStaticMarkup(createElement(DownloadIcon, { "aria-label": "Download" }));
assert.match(labelled, /role="img"/);
assert.doesNotMatch(labelled, /aria-hidden/);

const custom = renderToStaticMarkup(createElement(DownloadIcon, {
  size: 16, color: "red", strokeWidth: 1.5, className: "x", "data-test": "y",
}));
assert.match(custom, /width="16" height="16"/);
assert.match(custom, /stroke="red" stroke-width="1.5"/);
assert.match(custom, /class="x"/);
assert.match(custom, /data-test="y"/);

console.log(`${metadata.icons.length} icons · React and SVG packages agree · props and a11y defaults OK`);
