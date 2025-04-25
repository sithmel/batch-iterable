import test from 'node:test';
import assert from 'node:assert';
import { reduce, iterableToBatchIterable } from '../index.js';

test('reduce aggregates elements using a reducer function', async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5]);
  const sum = (acc, x) => acc + x;

  const result = await reduce(array, sum, 0);

  assert.strictEqual(result, 15, 'Reduced result should match expected output');
});