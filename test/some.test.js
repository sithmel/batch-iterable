import test from "node:test"
import assert from "node:assert"
import { BatchIterable } from "../index.js"

test("some checks if any element satisfies a predicate", async () => {
  const array = new BatchIterable([1, 2, 3, 4, 5])
  const isGreaterThanThree = (x) => x > 3

  const result = await array.some(isGreaterThanThree)

  assert.strictEqual(result, true, "Some result should match expected output")
})

test("some returns false for an empty iterable", async () => {
  const array = new BatchIterable([])
  const isEven = (x) => x % 2 === 0

  const result = await array.some(isEven)

  assert.strictEqual(
    result,
    false,
    "Some should return false for an empty iterable",
  )
})
