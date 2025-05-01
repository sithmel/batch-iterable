import test from "node:test"
import assert from "node:assert"
import { BatchIterable } from "../index.js"

test("filter selects elements based on a predicate", async () => {
  const array = new BatchIterable([
    [1, 2, 3],
    [4, 5],
  ])
  const isEven = (x) => x % 2 === 0

  const result = await array.filter(isEven).toArray()

  assert.deepStrictEqual(
    result,
    [2, 4],
    "Filtered elements should match expected output",
  )
})

test("filter uses index in callback to filter elements", async () => {
  const array = new BatchIterable([["a"], ["b"], ["c", "d"], ["e"]])

  const result = await array
    .filter((_value, index) => index % 2 === 0)
    .toArray()

  assert.deepStrictEqual(
    result,
    ["a", "c", "e"],
    "Filtered elements based on index should match expected output",
  )
})
