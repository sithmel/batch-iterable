import test from 'node:test';
import assert from 'node:assert';
import { asyncIterableToBatchIterable, toArray } from '../index.js';

test('asyncIterableToBatchIterable converts async iterable to batch iterable', async () => {
  async function* asyncGen() {
    yield 1;
    yield 2;
    yield 3;
  }

  const batchIterable = asyncIterableToBatchIterable(asyncGen());
  const result = await toArray(batchIterable);

  assert.deepStrictEqual(result, [1, 2, 3], 'Converted elements should match expected output');
});