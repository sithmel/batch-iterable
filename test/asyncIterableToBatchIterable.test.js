import test from 'node:test';
import assert from 'node:assert';
import asyncIterableToBatchIterable from '../src/asyncIterableToBatchIterable.js';

test('asyncIterableToBatchIterable batches async iterable correctly', async () => {
  const asyncIterable = async function* () {
    yield* [1, 2, 3, 4, 5];
  };

  const batchSize = 2;
  const result = [];

  for await (const batch of asyncIterableToBatchIterable(asyncIterable(), batchSize)) {
    result.push(batch);
  }

  assert.deepStrictEqual(result, [[1, 2], [3, 4], [5]], 'Batches should match expected output');
});