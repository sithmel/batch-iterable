import test from 'node:test';
import assert from 'node:assert';
import { every, iterableToBatchIterable } from '../index.js';

test('every checks if all elements satisfy a condition', async () => {
  const array = iterableToBatchIterable([2, 4, 6]);
  const isEven = (x) => x % 2 === 0;

  const result = await every(array, isEven);

  assert.strictEqual(result, true, 'All elements should satisfy the condition');
});