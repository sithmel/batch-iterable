import test from 'node:test';
import assert from 'node:assert';
import drop from '../src/drop.js';

test('drop skips the first n elements', () => {
  const array = [1, 2, 3, 4, 5];
  const result = [...drop(array, 2)];

  assert.deepStrictEqual(result, [3, 4, 5], 'Dropped elements should match expected output');
});