// @ts-check
import test from "node:test"
import assert from "node:assert"
import { BatchIterable } from "../index.js"

test("reduce aggregates elements using a reducer function", async () => {
  const array = new BatchIterable([[1], [2, 3], [4, 5]])
  const sum = (acc, x) => acc + x

  const result = await array.reduce(sum, 0)

  assert.strictEqual(result, 15, "Reduced result should match expected output")
})

test("reduce uses index in callback to accumulate values", async () => {
  const array = new BatchIterable([[1], [2, 3]])
  const result = await array.reduce(
    (acc, value, index) => acc + value * index,
    0,
  )

  assert.strictEqual(
    result,
    8, // 0*1 + 1*2 + 2*3
    "Reduced value based on index should match expected output",
  )
})

test("reduce without initialValue aggregates elements using a reducer function", async () => {
  const array = new BatchIterable([[1, 2, 3, 4], [5]])
  const sum = (acc, x) => acc + x

  const result = await array.reduce(sum)

  assert.strictEqual(
    result,
    15,
    "Reduced result should match expected output when no initialValue is provided",
  )
})

test("reduce with initialValue using accumulator of diff type", async () => {
  const array = new BatchIterable([[1, 2, 3, 4], [5]])
  const concat = (acc, x) => [...acc, x]

  const result = await array.reduce(concat, [])

  assert.deepEqual(
    result,
    [1, 2, 3, 4, 5],
    "Reduced result should match expected output when no initialValue is provided",
  )
})
