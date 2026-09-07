# Fonts

Drop the font files for the two design faces in this folder.

    fonts/
      Lufga-Regular.woff2
      Lufga-Medium.woff2
      Lufga-SemiBold.woff2
      Lufga-Bold.woff2
      BebasNeue-Regular.woff2

`css/fonts.css` declares them with `@font-face` and the rest of the
stylesheets pick them up through two tokens in `css/tokens.css`:

    --tsd-font-body     Lufga        body copy, buttons, labels
    --tsd-font-display  Bebas Neue   headings and titles

## Format

**.woff2 is strongly preferred** — it is 30-50% smaller than .ttf/.otf and
is supported by every browser this game targets. If all you have is .ttf or
.otf, they will work: change the `url(...)` and `format(...)` in
css/fonts.css to match. Converting to .woff2 first is worth the minute it
takes.

## File names

The names above are what css/fonts.css expects. If your files are named
differently, either rename them to match or edit the `src:` lines.

## Weights

Lufga ships in several weights. The @font-face blocks map them like this:

    Regular   400
    Medium    500
    SemiBold  600
    Bold      700

Only add the blocks for the weights you actually have — a missing file is a
silent 404 and the browser falls back mid-page. Bebas Neue has a single
weight, so it needs one block only.

## Licensing

Lufga is a commercial font. Make sure the project's licence covers web
embedding before these files go on a public server.
