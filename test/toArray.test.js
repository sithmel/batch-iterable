import test from 'node:test';
import assert from 'node:assert';
import { BatchIterable } from "../index.js"

test('toArray converts a batch iterable to an array', async () => {
  const array = new BatchIterable([1, 2, 3, 4, 5]);

  const result = await array.toArray();

  assert.deepStrictEqual(result, [1, 2, 3, 4, 5], 'toArray should convert the batch iterable to an array');
});