(() => {
  'use strict';

  const { products, series } = window.WISHLIST;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const money = (value, currency = 'EUR') => `${currency === 'USD' ? 'US$' : '€'}${new Intl.NumberFormat('en-GB', { minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 }).format(value)}`;
  const price = item => `${item.prefix || (item.isManga ? 'From ' : '')}${money(item.price, item.currency)}`;
  const wishes = [
    ...products,
    ...series.map(item => ({ ...item, category: 'Manga', brand: item.author, isManga: true, detail: item.editions, priceNote: 'English editions · publisher list price for a single volume', url: `./manga.html#${item.id}` }))
  ];
  const shopNames = { 'covert-companion': 'Covert Instruments', 'quest-3': 'Coolblue', 'garmin-165': 'MediaMarkt', 'azeron-cyborg': 'Azeron', converse: 'Zalando', 'samsung-ssd': 'MediaMarkt', 'keychron-q0': 'Alternate', 'flipper-zero': 'Amazon NL', 'spy-earphones': 'Browse models' };
  const shopName = item => shopNames[item.id] || 'Browse editions';
  const external = 'target="_blank" rel="noopener noreferrer"';

  window.WishlistUI = { escape, money, price, wishes, external };

  const indexDialog = document.querySelector('#index-dialog');
  const indexList = document.querySelector('#index-list');
  const productDialog = document.querySelector('#product-dialog');
  let previousHash = '';

  if (indexList) {
    indexList.innerHTML = wishes.map((wish, index) => {
      const content = `<span>${String(index + 1).padStart(2, '0')}</span><span>${escape(wish.title)}</span><span>${escape(price(wish))} ↗</span>`;
      const href = wish.isManga ? wish.url : `./index.html#wish=${wish.id}`;
      return `<a class="index-row" href="${escape(href)}">${content}</a>`;
    }).join('');
  }

  document.querySelectorAll('[data-open-index]').forEach(button => button.addEventListener('click', () => indexDialog.showModal()));
  document.querySelector('.close-index')?.addEventListener('click', () => indexDialog.close());
  indexDialog?.addEventListener('click', event => {
    if (event.target === indexDialog) indexDialog.close();
  });
  indexList?.addEventListener('click', () => indexDialog.close());

  function openProduct(id, replaceHash = true) {
    const item = products.find(product => product.id === id);
    if (!item || !productDialog) return;
    if (replaceHash) {
      previousHash = location.hash.startsWith('#wish=') ? '' : location.hash;
      history.replaceState(null, '', `#wish=${id}`);
    }
    document.querySelector('#product-dialog-content').innerHTML = `
      <div class="product-layout">
        <div class="product-image" data-id="${item.id}" style="--card-color:${item.color}"><img src="${item.image}" alt="${escape(`${item.brand} ${item.title}`)}"></div>
        <div class="product-copy">
          <span class="eyebrow">${escape(item.category)} / ${escape(item.brand)}</span>
          <h2 id="product-title">${escape(item.title)}</h2>
          <p>${escape(item.detail)}</p>
          <dl><dt>Why I want it</dt><dd>${escape(item.why)}</dd><dt>Good for</dt><dd>${escape(item.goodFor)}</dd></dl>
          <div class="price-main">${escape(price(item))}</div>
          <p class="fine-print">${escape(item.priceNote)}</p>
          <a class="solid-link" href="${escape(item.url)}" ${external}>${item.id === 'spy-earphones' ? 'Browse models' : `View at ${shopName(item)}`} <span aria-hidden="true">↗</span></a>
          <a class="source-link" href="${escape(item.source)}" ${external}>Price / product source ↗</a>
        </div>
      </div>`;
    if (!productDialog.open) productDialog.showModal();
  }

  document.querySelector('.close-product')?.addEventListener('click', () => productDialog.close());
  productDialog?.addEventListener('click', event => {
    if (event.target === productDialog) productDialog.close();
  });
  productDialog?.addEventListener('close', () => {
    if (location.hash.startsWith('#wish=')) history.replaceState(null, '', `${location.pathname}${location.search}${previousHash}`);
  });

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-wish]');
    if (trigger) openProduct(trigger.dataset.wish);
  });

  function routeWish() {
    if (location.hash.startsWith('#wish=')) openProduct(decodeURIComponent(location.hash.slice(6)), false);
  }
  window.addEventListener('hashchange', routeWish);
  routeWish();

  if (document.body.dataset.page !== 'home') return;

  let selected = 1;
  const hero = document.querySelector('#hero-content');
  function renderHero() {
    const wish = wishes[selected];
    document.querySelector('#hero-counter').textContent = `${String(selected + 1).padStart(2, '0')} / ${wishes.length}`;
    const destination = wish.isManga ? `href="${wish.url}"` : `href="${escape(wish.url)}" ${external}`;
    hero.innerHTML = `
      <div class="hero-meta"><span class="eyebrow">${String(selected + 1).padStart(2, '0')} / ${escape(wish.category)}</span><h2>${escape(wish.title)}</h2><p class="hero-brand">${escape(wish.brand)}</p><p class="hero-spec">${escape(wish.detail)}</p></div>
      <div class="hero-object${wish.isManga ? ' is-book' : ''}" data-id="${wish.id}"><img src="${wish.image}" alt="${escape(wish.title)}" fetchpriority="high"></div>
      <div class="hero-story"><span class="eyebrow">Why I want it</span><p>${escape(wish.why)}</p><div class="hero-price"><div class="price-main">${wish.prefix || wish.isManga ? `<span class="price-prefix">${wish.prefix || 'From '}</span>` : ''}${escape(money(wish.price, wish.currency))}</div><p class="fine-print">${escape(wish.priceNote)}</p></div><a class="solid-link" ${destination}>${wish.isManga ? 'Browse editions' : wish.id === 'spy-earphones' ? 'Browse models' : `View at ${shopName(wish)}`} <span aria-hidden="true">↗</span></a></div>`;
  }

  function moveHero(direction) {
    selected = (selected + direction + wishes.length) % wishes.length;
    renderHero();
  }
  document.querySelector('#hero-prev').addEventListener('click', () => moveHero(-1));
  document.querySelector('#hero-next').addEventListener('click', () => moveHero(1));
  document.querySelector('.showcase').addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      moveHero(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  renderHero();

  let category = 'All';
  const search = document.querySelector('#gift-search');
  const grid = document.querySelector('#gift-grid');
  function renderGifts() {
    const query = search.value.toLocaleLowerCase().trim();
    const filtered = wishes.filter(wish => (category === 'All' || wish.category === category) && `${wish.title} ${wish.brand} ${wish.category} ${wish.why} ${wish.goodFor}`.toLocaleLowerCase().includes(query));
    grid.innerHTML = filtered.map(wish => {
      const index = wishes.indexOf(wish) + 1;
      const imageContent = `<div class="gift-image${wish.isManga ? ' is-book' : ''}" data-id="${wish.id}" style="--card-color:${wish.color}"><span class="image-index">${String(index).padStart(2, '0')}</span><img src="${wish.image}" alt="${escape(wish.title)}" loading="lazy" decoding="async"><span class="image-arrow" aria-hidden="true">↗</span></div>`;
      const imageLink = wish.isManga ? `<a class="gift-image-link" href="${wish.url}" aria-label="Browse ${escape(wish.title)} editions">${imageContent}</a>` : `<button class="gift-image-link" type="button" data-wish="${wish.id}" aria-label="View ${escape(wish.title)}">${imageContent}</button>`;
      const action = wish.isManga ? `<a class="card-action" href="${wish.url}">All editions ↗</a>` : `<button class="card-action" data-wish="${wish.id}" type="button">View wish ↗</button>`;
      return `<article class="gift-card" data-category="${wish.category}">${imageLink}<div class="card-meta"><span>${escape(wish.category)}</span><span>${escape(wish.isManga ? 'English editions' : wish.brand)}</span></div><div class="card-title-row"><h3>${escape(wish.title)}</h3><span>${escape(price(wish))}</span></div><p class="card-why">${escape(wish.why)}</p><div class="card-bottom"><span>${escape(wish.isManga ? wish.editions : wish.goodFor)}</span>${action}</div></article>`;
    }).join('');
    document.querySelector('#gift-empty').hidden = filtered.length !== 0;
    document.querySelector('#gift-results').textContent = `${filtered.length} ${filtered.length === 1 ? 'wish' : 'wishes'} shown`;
  }
  document.querySelector('#category-filters').addEventListener('click', event => {
    const filter = event.target.closest('[data-category]');
    if (!filter) return;
    category = filter.dataset.category;
    document.querySelectorAll('#category-filters .filter').forEach(button => {
      const active = button === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    renderGifts();
  });
  search.addEventListener('input', renderGifts);
  document.querySelector('#reset-gifts').addEventListener('click', () => {
    search.value = '';
    document.querySelector('[data-category="All"]').click();
    search.focus();
  });
  renderGifts();
})();
