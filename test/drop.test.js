import test from "node:test"
import assert from "node:assert"
import { drop, iterableToBatchIterable, toArray } from "../index.js"

test("drop skips the first n elements", async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5])
  const result = await toArray(drop(array, 2))

  assert.deepStrictEqual(
    result,
    [3, 4, 5],
    "Dropped elements should match expected output",
  )
})

test("drop skips the first 0 elements", async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5])
  const result = await toArray(drop(array, 0))

  assert.deepStrictEqual(
    result,
    [1, 2, 3, 4, 5],
    "Dropped elements should match expected output",
  )
})

test("drop skips the first many elements", async () => {
  const array = iterableToBatchIterable([1, 2, 3, 4, 5])
  const result = await toArray(drop(array, 10))

  assert.deepStrictEqual(
    result,
    [],
    "Dropped all elements",
  )
})
