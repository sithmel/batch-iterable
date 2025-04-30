import test from "node:test"
import assert from "node:assert"
import { BatchIterable } from "../index.js"

test("map applies a function to each element", async () => {
  const array = new BatchIterable([1, 2, 3, 4, 5])
  const double = (x) => x * 2

  const result = await array.map(double).toArray()

  assert.deepStrictEqual(
    result,
    [2, 4, 6, 8, 10],
    "Mapped elements should match expected output",
  )
})

test("map uses index in callback to transform elements", async () => {
  const array = new BatchIterable(["a", "b", "c"])
  const result = await array.map((value, index) => `${value}${index}`).toArray()

  assert.deepStrictEqual(
    result,
    ["a0", "b1", "c2"],
    "Mapped elements based on index should match expected output",
  )
})
