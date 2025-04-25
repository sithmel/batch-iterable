import test from 'node:test';
import assert from 'node:assert';
import { toArray, iterableToBatchIterable } from '../index.js';

test('toArray converts a batch iterable to an array', async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5]);

  const result = await toArray(array);

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5], 'toArray should convert the batch iterable to an array');
});