(() => {
  'use strict';

  const { series } = window.WISHLIST;
  const books = window.MANGA_CATALOG;
  const { escape, money, external } = window.WishlistUI;
  const search = document.querySelector('#book-search');
  let activeSeries = series.some(item => item.id === location.hash.slice(1)) ? location.hash.slice(1) : series[0].id;
  let edition = 'all';

  function renderTabs() {
    document.querySelector('#series-tabs').innerHTML = series.map((item, index) => `<button class="series-tab${item.id === activeSeries ? ' active' : ''}" type="button" data-series="${item.id}" aria-pressed="${item.id === activeSeries}"><img src="${item.image}" alt=""><span>${escape(item.title)}<small>${String(index + 1).padStart(2, '0')} / English</small></span></button>`).join('');
  }

  function renderSeries() {
    const item = series.find(entry => entry.id === activeSeries);
    document.title = `${item.title} — The manga shelf`;
    document.querySelector('#series-detail').innerHTML = `
      <div class="series-about"><span class="eyebrow">The English collection</span><h2 id="series-title">${escape(item.title)}</h2><p class="series-author">${escape(item.author)}</p><p class="series-description">${escape(item.description)}</p></div>
      <div class="series-cover" style="--series-color:${item.color}"><img src="${item.image}" alt="${escape(item.title)} English ${['berserk', 'hellsing'].includes(item.id) ? 'Deluxe Volume 1' : item.id === 'soul-eater' ? 'Perfect Edition 1' : 'Volume 1'} cover"></div>
      <div class="series-info"><dl><dt>Why I want it</dt><dd>${escape(item.why)}</dd><dt>The collection</dt><dd>${escape(item.range)}</dd></dl><p class="edition-note">${escape(item.note)}</p>${item.extras ? `<a class="source-link" href="${item.extras}" ${external}>Volume 30 exclusive cover editions ↗</a>` : ''}</div>`;
    renderTabs();
    renderBooks();
  }

  function bookLinks(book) {
    const direct = book.edition === 'bundle' && !book.isbn;
    if (direct) return `<div class="book-links"><a href="${escape(book.shop)}" ${external}>View retailer bundle ↗</a></div>`;
    return `<div class="book-links"><a href="${escape(book.shop)}" ${external} aria-label="Find ${escape(book.label || `Volume ${book.volume}`)} in English on bol">bol ↗</a><a href="${escape(book.amazon)}" ${external} aria-label="Find ${escape(book.label || `Volume ${book.volume}`)} in English on Amazon Netherlands">Amazon NL ↗</a><a href="${escape(book.source)}" ${external}>Publisher ↗</a></div>`;
  }

  function status(book) {
    if (book.status === 'preorder') {
      const date = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${book.release}T00:00:00Z`));
      return `<span class="book-status">Preorder · ${escape(date)}</span>`;
    }
    return book.status === 'soldout' ? '<span class="book-status soldout">Sold out when checked</span>' : '';
  }

  function entry(book) {
    const isBundle = book.edition === 'bundle';
    const label = book.label || `Volume ${book.volume}`;
    const subtitle = book.coverage || 'English paperback · one volume';
    return `<article class="book-entry${isBundle ? ' bundle-entry' : ''}" data-book-id="${book.id}">
      ${isBundle ? `<span class="eyebrow">${escape(book.kind)}</span>` : ''}
      <div class="book-entry-top"><h4>${escape(label)}</h4><div class="book-price">${escape(money(book.price, book.currency))}</div></div>
      <p class="book-subtitle">${escape(subtitle)}</p>
      ${status(book)}
      ${book.note ? `<p class="book-note">${escape(book.note)}</p>` : ''}
      ${book.isbn ? `<p class="book-isbn">ISBN ${escape(book.isbn)}${book.currency === 'USD' ? ' / US list price' : ''}</p>` : '<p class="book-isbn">Retailer price / delivery extra</p>'}
      ${bookLinks(book)}
    </article>`;
  }

  function matchesQuery(book, query) {
    if (!query) return true;
    const text = `${book.label || `Volume ${book.volume}`} ${book.isbn || ''} ${book.edition} ${book.kind || ''} ${book.coverage || ''}`.toLocaleLowerCase();
    const number = query.match(/^(?:vol(?:ume)?\.?\s*)?(\d+)$/);
    if (number && number[1].length < 4) return book.edition !== 'bundle' && book.volume === Number(number[1]);
    return text.includes(query);
  }

  function renderBooks() {
    const query = search.value.trim().toLocaleLowerCase();
    const available = books.filter(book => book.series === activeSeries);
    const filtered = available.filter(book => (edition === 'all' || book.edition === edition) && matchesQuery(book, query));
    const descriptions = {
      bundle: ['Box sets & bundles', 'One purchase, several books'],
      collected: [activeSeries === 'soul-eater' ? 'The Perfect Editions' : 'The deluxe editions', 'Larger collected hardcovers'],
      single: ['The single volumes', 'One book at a time']
    };
    document.querySelector('#catalog-content').innerHTML = ['bundle', 'collected', 'single'].map(format => {
      const group = filtered.filter(book => book.edition === format);
      if (!group.length) return '';
      return `<section class="catalog-group" aria-label="${descriptions[format][0]}"><div class="catalog-group-heading"><h3>${descriptions[format][0]} <span class="sr-only">for ${escape(series.find(item => item.id === activeSeries).title)}</span></h3><span>${descriptions[format][1]}</span></div><div class="${format === 'bundle' ? 'bundle-grid' : 'books-grid'}">${group.map(entry).join('')}</div></section>`;
    }).join('');
    document.querySelector('#book-count').textContent = `${filtered.length} of ${available.length} editions shown\nAll in English`;
    document.querySelector('#book-empty').hidden = filtered.length !== 0;
    document.querySelectorAll('#edition-filters [data-edition]').forEach(button => {
      const active = button.dataset.edition === edition;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  document.querySelector('#series-tabs').addEventListener('click', event => {
    const button = event.target.closest('[data-series]');
    if (!button) return;
    activeSeries = button.dataset.series;
    edition = 'all';
    search.value = '';
    history.replaceState(null, '', `#${activeSeries}`);
    renderSeries();
    document.querySelector(`[data-series="${activeSeries}"]`).focus({ preventScroll: true });
  });
  window.addEventListener('hashchange', () => {
    const next = location.hash.slice(1);
    if (series.some(item => item.id === next)) {
      activeSeries = next;
      edition = 'all';
      search.value = '';
      renderSeries();
    }
  });
  document.querySelector('#edition-filters').addEventListener('click', event => {
    const button = event.target.closest('[data-edition]');
    if (!button) return;
    edition = button.dataset.edition;
    renderBooks();
  });
  search.addEventListener('input', renderBooks);
  document.querySelector('#reset-books').addEventListener('click', () => {
    search.value = '';
    edition = 'all';
    renderBooks();
    search.focus();
  });
  renderSeries();
})();
