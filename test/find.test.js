import test from 'node:test';
import assert from 'node:assert';
import { find, iterableToBatchIterable } from '../index.js';

test('find returns the first element that satisfies a condition', async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5]);
  const isEven = (x) => x % 2 === 0;

  const result = await find(array, isEven);

  assert.strictEqual(result, 2, 'First element satisfying the condition should be returned');
});