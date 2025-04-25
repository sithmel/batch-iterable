import test from 'node:test';
import assert from 'node:assert';
import { take, iterableToBatchIterable, toArray } from '../index.js';

test('take retrieves a specified number of elements', async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5]);

  const result = await toArray(take(array, 3));

  assert.deepStrictEqual(result, [1, 2, 3], 'Taken elements should match expected output');
});