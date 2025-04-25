import test from 'node:test';
import assert from 'node:assert';
import { iterableToBatchIterable, toArray } from '../index.js';

test('iterableToBatchIterable converts an iterable to a batch iterable', async () => {
  const array = [1, 2, 3, 4, 5];

  const batchIterable = iterableToBatchIterable(array);
  const result = await toArray(batchIterable);

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5], 'iterableToBatchIterable should convert the iterable to a batch iterable');
});