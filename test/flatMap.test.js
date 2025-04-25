import test from 'node:test';
import assert from 'node:assert';
import { flatMap, iterableToBatchIterable, toArray } from '../index.js';

test('flatMap maps and flattens elements', async () => {
  const array = iterableToBatchIterable([1, 2, 3]);
  const duplicate = (x) => [x, x];

  const result = await toArray(flatMap(array, duplicate));

  assert.deepStrictEqual(result, [1, 1, 2, 2, 3, 3], 'Mapped and flattened elements should match expected output');
});