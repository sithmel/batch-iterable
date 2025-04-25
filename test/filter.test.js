import test from 'node:test';
import assert from 'node:assert';
import {filter, iterableToBatchIterable, toArray} from '../index.js';

test('filter selects elements based on a predicate', async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5])
  const isEven = (x) => x % 2 === 0;
  
  const result = await toArray(filter(array, isEven));

  assert.deepStrictEqual(result, [2, 4], 'Filtered elements should match expected output');
});

test("filter uses index in callback to filter elements", async () => {
  const array = iterableToBatchIterable(["a", "b", "c", "d", "e"]);
  const result = await toArray(filter(array, (_value, index) => index % 2 === 0));

  assert.deepStrictEqual(
    result,
    ["a", "c", "e"],
    "Filtered elements based on index should match expected output"
  );
});