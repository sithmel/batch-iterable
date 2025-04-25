import test from 'node:test';
import assert from 'node:assert';
import { flatMap, iterableToBatchIterable, toArray } from '../index.js';

test('flatMap maps and flattens elements', async () => {
  const array = iterableToBatchIterable([1, 2, 3]);
  const duplicate = (x) => [x, x];

  const result = await toArray(flatMap(array, duplicate));

  assert.deepStrictEqual(result, [1, 1, 2, 2, 3, 3], 'Mapped and flattened elements should match expected output');
});

test('flatMap with empty input', async () => {
  const array = iterableToBatchIterable([]);
  const duplicate = (x) => [x, x];

  const result = await toArray(flatMap(array, duplicate));

  assert.deepStrictEqual(result, [], 'FlatMap should return an empty array for empty input');
});

test('flatMap with nested arrays', async () => {
  const array = iterableToBatchIterable([[1, 2], [3, 4]]);
  const flatten = (x) => x;

  const result = await toArray(flatMap(array, flatten));

  assert.deepStrictEqual(result, [1, 2, 3, 4], 'FlatMap should flatten nested arrays');
});

test('flatMap with transformation', async () => {
  const array = iterableToBatchIterable([1, 2, 3]);
  const transform = (x) => [x * 2];

  const result = await toArray(flatMap(array, transform));

  assert.deepStrictEqual(result, [2, 4, 6], 'FlatMap should apply the transformation function');
});

test('flatMap with scalar output', async () => {
  const array = iterableToBatchIterable([1, 2, 3]);
  const toScalar = (x) => x * 2;

  const result = await toArray(flatMap(array, toScalar));

  assert.deepStrictEqual(result, [2, 4, 6], 'FlatMap should handle scalar outputs correctly');
});

test('flatMap throws an exception if the function returns a string', async () => {
  const array = iterableToBatchIterable([1, 2, 3]);
  const toString = (x) => `${x}`;

  await assert.rejects(async () => {
    await toArray(flatMap(array, toString));
  }, /TypeError: flatMap: Iterator.prototype.flatMap called on non-object/, 'FlatMap should throw an exception if the function returns a string');
});

test("flatMap uses index in callback to flatten and transform elements", async () => {
  const array = iterableToBatchIterable(["a", "b", "c"]);
  const result = await toArray(flatMap(array, (value, index) => [value, index]));

  assert.deepStrictEqual(
    result,
    ["a", 0, "b", 1, "c", 2],
    "Flat-mapped elements based on index should match expected output"
  );
});