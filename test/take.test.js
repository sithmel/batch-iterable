import test from 'node:test';
import assert from 'node:assert';
import { BatchIterable } from "../index.js"

test('take retrieves a specified number of elements', async () => {
  const array = new BatchIterable([[1, 2], [3, 4, 5]]);

  const result = await array.take(3).toArray();

  assert.deepStrictEqual(result, [1, 2, 3], 'Taken elements should match expected output');
});

test('take retrieves the first 0 elements', async () => {
  const array = new BatchIterable([[1, 2, 3, 4], [5]]);
  const result = await array.take(0).toArray();

  assert.deepStrictEqual(result, [], 'Taken elements should match expected output');
});

test('take retrieves more elements than available', async () => {
  const array = new BatchIterable([[1, 2, 3], [4, 5]]);
  const result = await array.take(10).toArray();

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5], 'Taken elements should match expected output');
});