import test from 'node:test';
import assert from 'node:assert';
import filter from '../src/filter.js';

test('filter selects elements based on a predicate', () => {
  const array = [1, 2, 3, 4, 5];
  const isEven = (x) => x % 2 === 0;

  const result = [...filter(array, isEven)];

  assert.deepStrictEqual(result, [2, 4], 'Filtered elements should match expected output');
});