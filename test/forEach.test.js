import test from 'node:test';
import assert from 'node:assert';
import { forEach, iterableToBatchIterable } from '../index.js';

test('forEach applies a callback to each element', async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5]);
  const result = [];

  await forEach(array, (item) => result.push(item * 2));

  assert.deepStrictEqual(result, [2, 4, 6, 8, 10], 'forEach should apply the callback to each element');
});