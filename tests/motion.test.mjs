import { test } from 'node:test';
import assert from 'node:assert/strict';
import { installMotion } from '../assets/js/motion.js';

test('reduced motion installs no observers or pointer effects', () => {
  let queried = false;
  const cleanup = installMotion({ reduced: true, finePointer: true, root: { querySelectorAll() { queried = true; } } });
  cleanup();
  assert.equal(queried, false);
});

test('reveals once on entry and cancels pending motion on cleanup', () => {
  let callback, disconnected = false, canceled = false, runs = 0;
  const observed = new Set();
  const animation = { cancel() { canceled = true; } };
  const card = { parentElement: { children: [] }, animate(frames, options) {
    runs++;
    assert.equal(frames.at(-1).opacity, 1);
    assert.ok(options.duration > 0);
    return animation;
  } };
  card.parentElement.children = [card];
  const root = { querySelectorAll(selector) { return selector.startsWith('#portfolio') ? [card] : []; } };
  const cleanup = installMotion({ reduced: false, finePointer: false, root, observe(fn) {
    callback = fn;
    return { observe(element) { observed.add(element); }, unobserve(element) { observed.delete(element); }, disconnect() { disconnected = true; } };
  } });
  assert.ok(observed.has(card));
  callback([{ target: card, isIntersecting: false }]);
  assert.equal(runs, 0);
  callback([{ target: card, isIntersecting: true }]);
  callback([{ target: card, isIntersecting: true }]);
  assert.equal(runs, 1);
  assert.equal(observed.size, 0);
  cleanup();
  assert.ok(disconnected);
  assert.ok(canceled);
});
