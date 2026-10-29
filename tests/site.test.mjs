import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createPreviewServer } from '../server.mjs';

const root = new URL('../', import.meta.url);
test('all local HTML, CSS and application asset references exist', async () => {
  for (const file of ['index.html', 'assets/js/app.js', 'assets/css/site.css']) {
    const source = await readFile(new URL(file, root), 'utf8');
    const refs = [...source.matchAll(/["'(]((?:\.\/assets\/|\.\.\/)[^"')]+)["')]/g)];
    assert.ok(refs.length, `No references checked in ${file}`);
    for (const [, ref] of refs) {
      // App data paths resolve against the document, CSS paths against the CSS file.
      await access(new URL(ref, file.endsWith('.css') ? new URL(file, root) : new URL('index.html', root)));
    }
    assert.doesNotMatch(source, /#replace-with-/);
  }
});
test('preview serves public files and rejects private files and traversal', async t => {
  const server = createPreviewServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  for (const [path, status, type] of [
    ['/', 200, 'text/html'], ['/assets/js/app.js', 200, 'text/javascript'],
    ['/assets/css/site.css', 200, 'text/css'], ['/assets/icons/linkedin-logo.webp', 200, 'image/webp'],
    ['/Website%20Portfolio/', 200, 'text/html'], ['/.git/config', 404],
    ['/package.json', 404], ['/assets/%2e%2e%2fpackage.json', 404],
    ['/assets/%ZZ', 400], ['/missing', 404]
  ]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, status, path);
    if (type) assert.ok(response.headers.get('content-type').startsWith(type), path);
  }
  const head = await fetch(origin, { method: 'HEAD' });
  assert.equal(head.status, 200); assert.equal(await head.text(), '');
  assert.equal((await fetch(origin, { method: 'POST' })).status, 405);
});
