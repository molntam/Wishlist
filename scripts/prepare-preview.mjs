import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const files = ['index.html', 'manga.html', 'styles.css', 'data.js', 'catalog.js', 'app.js', 'manga.js', 'assets'];
await mkdir(resolve(root, 'dist'), { recursive: true });
for (const name of files) await cp(resolve(root, name), resolve(root, 'dist', name), { recursive: true });
console.log('Preview prepared in dist/. GitHub Pages serves the source files at the repository root.');
