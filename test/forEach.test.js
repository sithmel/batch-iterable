import test from "node:test"
import assert from "node:assert"
import { BatchIterable } from "../index.js"

test("forEach applies a callback to each element", async () => {
  const array = new BatchIterable([
    [1, 2],
    [3, 4, 5],
  ])
  const result = []

  await array.forEach((item) => result.push(item * 2))

  assert.deepStrictEqual(
    result,
    [2, 4, 6, 8, 10],
    "forEach should apply the callback to each element",
  )
})

test("forEach uses index in callback to iterate over elements", async () => {
  const array = new BatchIterable([["a", "b"], ["c"]])
  const result = []
  await array.forEach((value, index) => result.push(`${value}${index}`))

  assert.deepStrictEqual(
    result,
    ["a0", "b1", "c2"],
    "forEach should iterate over elements and include index in callback",
  )
})
