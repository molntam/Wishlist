import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { runInNewContext, Script } from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const context = { window: {} };
for (const file of ['data.js', 'catalog.js']) runInNewContext(await readFile(resolve(root, file), 'utf8'), context);
const { products, series } = context.window.WISHLIST;
const books = context.window.MANGA_CATALOG;
assert.equal(products.length, 9, 'Keep the nine requested products.');
assert.equal(series.length, 5, 'Keep all five requested manga series.');
const expected = {
  'chainsaw-man': { single: 23, collected: 0, bundle: 1 },
  'jujutsu-kaisen': { single: 31, collected: 0, bundle: 1 },
  berserk: { single: 43, collected: 14, bundle: 1 },
  hellsing: { single: 10, collected: 3, bundle: 1 },
  'soul-eater': { single: 25, collected: 17, bundle: 2 }
};
for (const [id, formats] of Object.entries(expected)) {
  for (const [format, count] of Object.entries(formats)) assert.equal(books.filter(book => book.series === id && book.edition === format).length, count, `${id}: ${format}`);
  const singles = books.filter(book => book.series === id && book.edition === 'single');
  const start = id === 'jujutsu-kaisen' ? 0 : 1;
  for (let index = 0; index < singles.length; index++) assert.equal(singles[index].volume, start + index, `${id}: no missing or duplicated volume numbers`);
}
assert.equal(new Set(books.map(book => book.id)).size, books.length, 'Each catalogue entry needs a unique ID.');
const isbnIsValid = isbn => /^97[89]\d{10}$/.test(isbn) && [...isbn].reduce((sum, n, index) => sum + Number(n) * (index % 2 ? 3 : 1), 0) % 10 === 0;
for (const book of books) {
  assert.equal(book.language, 'English');
  assert.ok(book.price > 0);
  assert.ok(['USD', 'EUR'].includes(book.currency));
  if (book.isbn) {
    assert.ok(isbnIsValid(book.isbn), `Invalid print ISBN: ${book.id}`);
    assert.ok(book.shop.includes(book.isbn), `Shopping link must use the exact English ISBN: ${book.id}`);
  }
  assert.ok(new URL(book.source).protocol === 'https:');
}
assert.equal(books.filter(book => book.status === 'preorder').length, 2);
assert.equal(books.find(book => book.series === 'berserk' && book.volume === 43 && book.edition === 'single').release, '2026-11-24');
for (const item of [...products, ...series]) await access(resolve(root, item.image));
for (const file of ['app.js', 'manga.js']) new Script(await readFile(resolve(root, file), 'utf8'), { filename: file });
for (const file of ['index.html', 'manga.html']) {
  const source = await readFile(resolve(root, file), 'utf8');
  assert.ok(source.includes('name="viewport"'));
  assert.ok(source.includes('lang="en"'));
  for (const match of source.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const path = match[1].split('#')[0];
    if (!path.startsWith('https://')) {
      assert.ok(!path.startsWith('/'), `Use relative paths for GitHub project Pages: ${path}`);
      await access(resolve(root, path));
    }
  }
}
const styles = await readFile(resolve(root, 'styles.css'), 'utf8');
for (const match of styles.matchAll(/url\('([^']+)'\)/g)) await access(resolve(root, match[1]));
console.log(`Checked ${products.length} requested products, ${series.length} series and ${books.length} English manga entries. All volume sequences, ISBNs, assets and Pages paths passed.`);
