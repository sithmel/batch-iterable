import assert from 'node:assert';
import flatMap from '../src/flatMap.js';

(() => {
  const array = [1, 2, 3];
  const duplicate = (x) => [x, x];

  const result = [...flatMap(array, duplicate)];

  assert.deepStrictEqual(result, [1, 1, 2, 2, 3, 3], 'Flat-mapped elements should match expected output');
  console.log('flatMap test passed');
})();