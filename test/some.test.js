import test from 'node:test';
import assert from 'node:assert';
import { some, iterableToBatchIterable } from '../index.js';

test('some checks if any element satisfies a predicate', async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5]);
  const isGreaterThanThree = (x) => x > 3;

  const result = await some(array, isGreaterThanThree);

  assert.strictEqual(result, true, 'Some result should match expected output');
});