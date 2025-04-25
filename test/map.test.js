import test from 'node:test';
import assert from 'node:assert';
import { map, iterableToBatchIterable, toArray } from '../index.js';

test('map applies a function to each element', async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5]);
  const double = (x) => x * 2;

  const result = await toArray(map(array, double));

  assert.deepStrictEqual(result, [2, 4, 6, 8, 10], 'Mapped elements should match expected output');
});