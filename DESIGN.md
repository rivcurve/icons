---
version: draft
colors:
  paper: "#FAF8F4"
  surface: "#FFFDF9"
  ink: "#24231F"
  muted: "#5A574F"
  line: "#D9D4CA"
  accent: "#A8331B"
  orange: "#F26648"
  focus: "#95331F"
  soft: "#EEEAE2"
  hover: "#EEE8DD"
  raised: "#F1EDE6"
  selection: "#FFC2AE"
  paper-dark: "#1C1A17"
  surface-dark: "#26231F"
  ink-dark: "#F7F1E8"
  muted-dark: "#C1B8AA"
  line-dark: "#51483F"
  accent-dark: "#FFA38B"
  orange-dark: "#D95B40"
  focus-dark: "#FFB19A"
  soft-dark: "#38322B"
  hover-dark: "#40382F"
  raised-dark: "#302A24"
  selection-dark: "#634034"
typography:
  display:
    fontFamily: Manrope Variable
    fontSize: 5.5rem
    fontWeight: 850
    lineHeight: 0.99
    letterSpacing: -0.04em
  body:
    fontFamily: Manrope Variable
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: ui-monospace
    fontSize: 0.85rem
    lineHeight: 1.7
rounded:
  control: 7px
  panel: 12px
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    height: 45px
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: 45px
---
# Rivcurve

## Overview

Rivcurve is an icon library first. The homepage introduces the collection through a files interface built with Refined icons. Get started leads to the package guide. Browse icons leads to the searchable catalog.

The selected [homepage reference](docs/design/homepage-reference.png) sets the composition. The implemented demo uses the library's original vectors with ordinary interface proportions.

## Colors

Paper is the page backdrop. Surface supports the compact file example. Ink is used for primary copy, controls and icons. Reserve orange for the first screen's illustration field, and use accent for inline links and the mark.

The dark theme keeps the warm palette and uses brighter ink and accent colors. Soft is the selected surface, hover marks an interactive state, raised groups code and similar content, and focus identifies the keyboard position. Components use the semantic CSS variables in `apps/site/app/globals.css`; Arc maps its variables to the same palette. System follows the operating system. Explicit Light or Dark choices persist across page loads.

## Typography

Manrope Variable carries display and interface text. Use a monospace face for code, and keep snippets scrollable when their lines cannot fit. Header and navigation should hold their shape at the smallest supported width.

## Layout

Constrain content to 1200px with fluid side gutters. On desktop the first screen is split between the headline and the file example. At 680px and below, the headline and both actions come first, followed by the example and installation guide.

## Components

Primary links use a contrasting solid fill in each theme. The secondary action uses an outline. Use flat surfaces and thin rules between sections. Recurring icons come from the generated catalog and retain the 24×24 viewBox and 2-unit stroke.

## Do's and Don'ts

Use real SVGs in specimens and examples. Show the proposed status of package snippets until the packages are published. Keep icon export in the catalog.
