import test from 'node:test';
import assert from 'node:assert';
import every from '../src/every.js';

test('every checks if all elements satisfy a condition', () => {
  const array = [2, 4, 6];
  const isEven = (x) => x % 2 === 0;

  const result = every(array, isEven);

  assert.strictEqual(result, true, 'Every element should satisfy the condition');
});