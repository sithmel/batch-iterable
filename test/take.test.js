import test from 'node:test';
import assert from 'node:assert';
import { take, iterableToBatchIterable, toArray } from '../index.js';

test('take retrieves a specified number of elements', async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5]);

  const result = await toArray(take(array, 3));

  assert.deepStrictEqual(result, [1, 2, 3], 'Taken elements should match expected output');
});

test('take retrieves the first 0 elements', async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5]);
  const result = await toArray(take(array, 0));

  assert.deepStrictEqual(result, [], 'Taken elements should match expected output');
});

test('take retrieves more elements than available', async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5]);
  const result = await toArray(take(array, 10));

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5], 'Taken elements should match expected output');
});