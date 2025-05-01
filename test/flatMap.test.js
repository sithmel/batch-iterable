import test from "node:test"
import assert from "node:assert"
import { BatchIterable } from "../index.js"

test("flatMap maps and flattens elements", async () => {
  const array = new BatchIterable([[1, 2, 3]])
  const duplicate = (x) => [x, x]

  const result = await array.flatMap(duplicate).toArray()

  assert.deepStrictEqual(
    result,
    [1, 1, 2, 2, 3, 3],
    "Mapped and flattened elements should match expected output",
  )
})

test("flatMap with empty input", async () => {
  const array = new BatchIterable([])
  const duplicate = (x) => [x, x]

  const result = await array.flatMap(duplicate).toArray()

  assert.deepStrictEqual(
    result,
    [],
    "FlatMap should return an empty array for empty input",
  )
})

test("flatMap with nested arrays", async () => {
  const array = new BatchIterable([[
    [1, 2],
    [3, 4],
  ]])
  const flatten = (x) => x

  const result = await array.flatMap(flatten).toArray()

  assert.deepStrictEqual(
    result,
    [1, 2, 3, 4],
    "FlatMap should flatten nested arrays",
  )
})

test("flatMap with transformation", async () => {
  const array = new BatchIterable([[1], [2, 3]])
  const transform = (x) => [x * 2]

  const result = await array.flatMap(transform).toArray()

  assert.deepStrictEqual(
    result,
    [2, 4, 6],
    "FlatMap should apply the transformation function",
  )
})

test("flatMap with scalar output", async () => {
  const array = new BatchIterable([[1, 2, 3]])
  const toScalar = (x) => x * 2

  const result = await array.flatMap(toScalar).toArray()

  assert.deepStrictEqual(
    result,
    [2, 4, 6],
    "FlatMap should handle scalar outputs correctly",
  )
})

test("flatMap throws an exception if the function returns a string", async () => {
  const array = new BatchIterable([[1], [2, 3]])
  const toString = (x) => `${x}`

  await assert.rejects(
    async () => {
      await array.flatMap(toString).toArray()
    },
    /TypeError: flatMap: Iterator.prototype.flatMap called on non-object/,
    "FlatMap should throw an exception if the function returns a string",
  )
})

test("flatMap uses index in callback to flatten and transform elements", async () => {
  const array = new BatchIterable([["a", "b", "c"]])
  const result = await array.flatMap((value, index) => [value, index]).toArray()

  assert.deepStrictEqual(
    result,
    ["a", 0, "b", 1, "c", 2],
    "Flat-mapped elements based on index should match expected output",
  )
})
