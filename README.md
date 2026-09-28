# James McShane Portfolio

A personal portfolio for cinematography, creative direction, and software, built as a lightweight static site for [james-mcshane.github.io](https://james-mcshane.github.io/).

## Run locally

Run `python3 -m http.server 8766` from this repository, then open `http://localhost:8766`.

There is no build step or package installation. GitHub Pages serves the repository root from `main`. Local changes are not published until they are committed and pushed.

## Edit the work

- `data.js`: sourced credits, titles, descriptions, images, links, and development statuses for the reel, 16 films, 11 campaigns, and 11 software projects.
- `media.js`: verified local motion preview mappings. Entries without a preview retain their original still.
- `index.html`: page structure, introduction, biography, and contact information.
- `styles.css`: responsive typography, colors, layouts, and interaction states.
- `app.js`: gallery and index views, filters, shareable project dialogs, keyboard behavior, and optional motion previews.
- `assets/`: locally hosted, optimized images, fonts and short media previews. Font licenses are included next to the font files.

Project links use `#project/<id>`. `#campaigns` and `#projects` select their gallery directly. External video players are loaded only after a project or the reel is opened. Closing a dialog removes the player. The page otherwise makes no third-party requests and has no analytics or tracking scripts.

## Motion previews

Previews are real three-second clips followed by the same frames in reverse, encoded as six-second silent MP4 loops. They load only on hover or keyboard focus on a device with a fine pointer. They stop on exit, offscreen movement, opening a dialog, or hiding the page. Reduced-motion and data-saving preferences keep the original still image. Touch devices use static posters and tap-to-open projects.

Johnnie Walker, Don Julio, and Vans have verified previews. Not every source video can be downloaded publicly. A working YouTube or Vimeo embed does not necessarily provide an accessible source file. Available source clips and unavailable previews are documented in local verification records.

To prepare another clip from an approved local source, run `python3 scripts/media-boomerang.py /path/to/source.mp4 project-id --start 12`. Register the generated MP4 and matching still in `media.js`. This utility requires ffmpeg, ffprobe, and cwebp; no account credentials are used. Keep source masters outside the public repository.

## Provenance and project boundaries

Original credits and content provenance are preserved from prior portfolio sources and verified locally. Public App Store links and source repository links are not proof of physical-device or live-provider behavior.

The Obsidian project routing remains in `AGENTS.md` and `CLAUDE.md`. The existing vault-wide validation failures in unrelated projects are separate from this portfolio's mapping.
