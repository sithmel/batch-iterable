import test from "node:test"
import assert from "node:assert"
import { BatchIterable } from "../index.js"

test("find returns the first element that satisfies a condition", async () => {
  const array = new BatchIterable([
    [1, 2],
    [3, 4, 5],
  ])
  const isEven = (x) => x % 2 === 0

  const result = await array.find(isEven)

  assert.strictEqual(
    result,
    2,
    "First element satisfying the condition should be returned",
  )
})

test("find returns undefined when no element satisfies the condition", async () => {
  const array = new BatchIterable([[1, 3], [5], [7]])
  const isEven = (x) => x % 2 === 0

  const result = await array.find(isEven)

  assert.strictEqual(
    result,
    undefined,
    "Find should return undefined when no element satisfies the condition",
  )
})
