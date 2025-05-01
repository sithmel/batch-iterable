import test from "node:test"
import assert from "node:assert"
import { BatchIterable } from "../index.js"

test("drop skips the first n elements", async () => {
  const array = new BatchIterable([[1, 2, 3 ], [4, 5]])
  const result = await array.drop(2).toArray()

  assert.deepStrictEqual(
    result,
    [3, 4, 5],
    "Dropped elements should match expected output",
  )
})

test("drop skips the first 0 elements", async () => {
  const array = new BatchIterable([[1, 2, 3 ], [4, 5]])
  const result = await array.drop(0).toArray()

  assert.deepStrictEqual(
    result,
    [1, 2, 3, 4, 5],
    "Dropped elements should match expected output",
  )
})

test("drop skips the first many elements", async () => {
  const array = new BatchIterable([[1, 2, 3 ], [4, 5]])
  const result = await array.drop(10).toArray()

  assert.deepStrictEqual(result, [], "Dropped all elements")
})
