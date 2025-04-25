import test from 'node:test';
import assert from 'node:assert';
import find from '../src/find.js';

test('find locates the first element satisfying a condition', () => {
  const array = [1, 2, 3, 4, 5];
  const isEven = (x) => x % 2 === 0;

  const result = find(array, isEven);

  assert.strictEqual(result, 2, 'Found element should match expected output');
});