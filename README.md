# Wishlist

Tamás’s personal gift wishlist, inspired by the restrained typography, warm background and object-focused layout of [Ravi Klaassens’s A24 concept](https://a24.raviklaassens.com/).

The site includes only the nine requested products and five requested manga series. It uses static HTML, CSS and JavaScript, with local product images and a self-hosted font. There are no runtime dependencies, accounts, analytics or server requirements.

![Homepage preview](assets/preview.jpg)

## Publish on GitHub Pages

1. Open this repository’s **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Choose **main** and **/ (root)**, then click **Save**.
4. Once GitHub finishes deployment, the project site is available at `https://molntam.github.io/Wishlist/`.

The `.nojekyll` file makes the root suitable for direct static hosting. All internal paths are relative, including font and image paths, so they work beneath `/Wishlist/`. A custom build or GitHub Actions workflow is not required. Later commits to `main` publish automatically after Pages has been enabled.

## Content

- `index.html`: the gallery, category filters, search, product details and full index.
- `manga.html`: the English manga shelf, series navigation and edition filters.
- `data.js`: the nine products and five series, with short reasons, uses, prices and source links.
- `catalog.js`: 172 English manga entries, including 130 released singles, two announced single-volume preorders, 34 collected hardcovers and six box sets / retailer bundles.
- `app.js`, `manga.js` and `styles.css`: behaviour and presentation.
- `assets/`: local product images, book covers, original earphone illustration and Instrument Serif font files.

### Manga coverage

| Series | Individual books | Collected editions | Sets and bundles |
| --- | --- | --- | --- |
| Chainsaw Man | 1–22; 23 marked as a preorder | — | Official 1–11 box set |
| Jujutsu Kaisen | 0–30 | — | Official complete 0–30 box set |
| Berserk | 1–42; 43 marked as a preorder | Deluxe 1–14 | Deluxe 1–14 retailer bundle |
| Hellsing | Second Edition 1–10 | Deluxe 1–3 | Complete Deluxe 1–3 retailer bundle |
| Soul Eater | Yen Press 1–25 | Square Enix Perfect Edition 1–17 | Complete paperback and Perfect Edition retailer sets |

Every numbered book has an English print ISBN, exact-ISBN searches on bol and Amazon Netherlands, and a publisher page. Retailer bundles without a shared ISBN link directly to their listing. Known sold-out bundles are marked. The Jujutsu Kaisen page also links to VIZ’s official Volume 30 exclusive-cover guide. Unrequested spin-offs and other gift recommendations are excluded.

## Prices and updates

Prices were researched on **27 October 2026** and are snapshots. They are not refreshed automatically. The site preserves original listing currencies rather than displaying unverified conversions. Manga book prices are labelled US publisher list prices; local shop checkout prices may differ. Bundles show the retailer listing currency. Delivery and import costs may be additional.

The Azeron link selects **Black / Medium / Curved / Elite**, so the displayed US$290 price is for that configuration. The Amazon Flipper listing could not be priced directly, so its card clearly labels the official US$169 list price and asks visitors to check Amazon NL. The invisible-earphone wish has no final model selected; its card uses an original illustration and gives an example Bluetooth-kit price range. The Converse card asks visitors to check the shoe size.

To update a product, edit its entry in `data.js`. To update manga stock, list prices, release dates or links, edit the matching entry in `catalog.js`. Keep the source URL, ISBN, language and edition together. Do not add unsupported volumes or treat a deluxe volume number as a standard paperback volume number.

See [SOURCES.md](SOURCES.md) for catalogue sources and asset credits.

## Check and preview

With Node.js installed, run:

```sh
npm run check
```

This validates requested item counts, complete numbered volume sequences, English ISBN checksums, edition IDs, source URLs, preorder dates, JavaScript syntax, local assets and GitHub Pages paths. It does not claim that every external store has stock.

For a local browser preview, serve the repository root with any static web server, for example:

```sh
python -m http.server 8000
```

Open `http://localhost:8000`. The optional `npm run preview:prepare` command copies public assets into an ignored `dist/` directory for managed preview environments; GitHub Pages serves the repository root directly.

## Credits

Product photography and manga covers belong to their respective brands, publishers and rights holders. The original retailer and publisher URLs are recorded in `SOURCES.md`. Instrument Serif is distributed under the [SIL Open Font License](assets/OFL-Instrument-Serif.txt). The site’s layout, code, favicon and generic earphone illustration were created for this wishlist.
