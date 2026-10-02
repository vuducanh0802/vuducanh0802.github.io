# Duc Anh Vu — personal homepage

Static site for GitHub Pages: [vuducanh0802.github.io](https://vuducanh0802.github.io/).

The landing page is `index.html`. The main sections are separate pages:
`about.html`, `journey.html`, `publications.html`, `service.html`, and
`places.html`. The navigation links open these pages directly.

## Run locally

```bash
python -m http.server 8765
```

Open `http://localhost:8765/`. You can also open `index.html` directly; the globe data loads without a local server.

In VS Code, open this project folder, press F5, and choose **Open homepage
(Chrome)**. The debug configuration opens `index.html` directly; no server is
needed.

## Update the content

- Edit `PLACES` in `assets/js/content.js` to add map markers. Each place needs a name, longitude/latitude in `coordinates`, a year, notes, and tags.
- Put personal trip photos in `assets/img/places/`. The current city photos are illustrative Wikimedia Commons images. When replacing them, update `PHOTO_CREDITS` in `assets/js/content.js`.
- Edit `PAPERS` for the complete publication list. The timeline's Research lane is generated from this list, so each work appears once per year there.
- Edit `RESEARCH_AREAS` to group papers in the interactive knowledge map. Each paper ID should appear in exactly one area.
- Edit `MILESTONES` for education, career news, and awards. The year rail grows automatically through the current year.
- Edit the biography in `about.html`, service details in `service.html`, and landing-page introduction in `index.html`.

## Assets and photo credits

- Globe coastline: simplified [Natural Earth 1:110m land polygons](https://github.com/nvkelso/natural-earth-vector/tree/master/geojson). Natural Earth data is public domain.
- Photo authors, licenses, and source filenames are listed in `PHOTO_CREDITS`. Each map card links to its Commons source page.
- D3 is bundled in `assets/vendor/d3.min.js` so the globe does not need a runtime CDN.
