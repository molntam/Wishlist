# Research and asset sources

Checked 27 October 2026. Product and catalogue data are snapshots, not a live stock feed. Short first-person reasons are based on the wishlist brief.

## Requested products

The full product and price-source URLs are stored with each product in `data.js`. These are the user’s original retailers: Covert Instruments, Coolblue Belgium, MediaMarkt Belgium, Azeron, Zalando Netherlands, MediaMarkt Netherlands, Alternate Netherlands and Amazon Netherlands. Advertising parameters were removed from links. The Azeron variant parameter is preserved.

- [Covert Companion Pro](https://covertinstruments.com/collections/all/products/covert-companion-pro): US$150.
- [Meta Quest 3 512 GB](https://www.coolblue.be/nl/product/936008/meta-quest-3-512gb.html): €619.
- [Garmin Forerunner 165](https://www.mediamarkt.be/nl/product/_garmin-smartwatch-forerunner-165-black-slate-grey-010-02863-20-2124836.html): €193.
- [Black Azeron Cyborg II](https://azeron.com/products/black-cyborg-ii?variant=51739886420307): selected Elite configuration US$290. Shopify product metadata confirms variant 51739886420307 as Medium / Curved / Elite.
- [Black Converse high-tops](https://www.zalando.nl/converse-all-star-hi-hoge-sneakers-zwart-co415a03c-802.html): from €63.95, depending on size.
- [Samsung 990 1 TB, linked model](https://www.mediamarkt.nl/nl/product/_samsung-990-ssd-7150-mbitss-pcie-40-x4-nvmetm-m2-black-1-tb-interne-ssd-1908764.html): €181. The brief’s product is retained even where another SSD might be better value.
- [Keychron Q0 Max](https://www.alternate.nl/Keychron/Q0-Max-gaming-numpad/html/product/1935513): €119.90.
- [Flipper Zero official store](https://flipper.net/products/flipper-zero): US$169 official list price. The purchase button preserves the [requested Amazon Netherlands listing](https://www.amazon.nl/dp/B0BFXKSFNT); its live price was not available to verify.
- [Example invisible-earphone kit](https://www.pingaoculto.com/product/bluetooth-neckloop-spy-earpiece-vip-pro/): €42.99–€69.99. The wish remains a generic model-to-choose category, not an endorsement of one fixed configuration.

## English manga

- [VIZ Chainsaw Man catalogue](https://www.viz.com/manga-books/manga/chainsaw-man/all): English print volume titles, product links and cover ISBNs. Volume 23 is explicitly a preorder.
- [VIZ Chainsaw Man box set](https://www.viz.com/manga-books/manga/chainsaw-man-box-set/product/7587): ISBN 9781974741427; includes volumes 1–11, not the whole ongoing series.
- [VIZ Jujutsu Kaisen catalogue](https://www.viz.com/manga-books/manga/jujutsu-kaisen/all): volume 0 and volumes 1–30.
- [VIZ Jujutsu Kaisen complete box set](https://www.viz.com/manga-books/manga/jujutsu-kaisen-complete-box-set/product/9017): ISBN 9781974769353; includes 0–30; publisher release 27 October 2026.
- [VIZ Volume 30 exclusive-cover guide](https://www.viz.com/blog/posts/jujutsu-kaisen-s-final-volume-collector-s-guide).
- [Penguin Random House Berserk catalogue](https://www.penguinrandomhouse.com/series/14515/berserk/) and the Dark Horse entries on [PRH Comics](https://prhcomics.com/). Each Berserk entry links to the publisher/distributor’s ISBN-specific page.
- [Berserk Volume 43](https://prhcomics.com/book/?isbn=9781506757278): current release is 24 November 2026, superseding the earlier October date.
- [Dark Horse Direct Hellsing Deluxe](https://www.darkhorsedirect.com/products/hellsing-deluxe-hardcover-volumes), and [PRH Hellsing Volume 1 Second Edition](https://www.penguinrandomhouse.com/books/737751/hellsing-volume-1-second-edition-by-created-written-and-illustrated-by-kohta-hirano-translated-by-duane-johnson-lettered-by-wilbert-lacuna/). The book data uses ten Second Edition singles and three deluxe hardcovers.
- [Yen Press Soul Eater](https://yenpress.com/series/soul-eater): 25 original English paperbacks.
- [Square Enix Soul Eater](https://squareenixmangaandbooks.square-enix-games.com/en-us/series/soul-eater): 17 English Perfect Edition hardcovers. Prices link to the publisher’s own product pages.
- [Deku’s Wisdom Berserk index](https://www.dekuswisdom.com/manga/berserk), [Berserk Deluxe index](https://www.dekuswisdom.com/manga/berserk/deluxe) and [Soul Eater index](https://www.dekuswisdom.com/manga/soul-eater): supplementary ISBN cross-reference where publisher series lists omit older books. Publisher/distributor product links are supplied for each entry.
- Retailer bundles are linked directly in `catalog.js`: Walt’s Comic Shop for Berserk and Hellsing, BKManga for Soul Eater. These are distinguished from official publisher box sets. Known unavailable sets are retained with a sold-out label.

## Local assets

Product images are downloaded from the requested retailers’ or brands’ product pages, including the Coolblue image CDN, MediaMarkt asset CDN, Zalando image CDN, Alternate and the brands’ Shopify image CDNs. Covers use VIZ’s official CloudFront images and Penguin Random House’s ISBN cover service. They are supplied locally to avoid hotlink failures when browsing.

`earpiece.svg` is an original generic illustration because no exact earphone model was specified. It is labelled as an illustration on the artwork.

Instrument Serif regular and italic are from [Google Fonts](https://fonts.google.com/specimen/Instrument+Serif). The font licence is included in `assets/OFL-Instrument-Serif.txt`.
