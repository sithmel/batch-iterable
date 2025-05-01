import test from "node:test"
import assert from "node:assert"
import { BatchIterable } from "../index.js"

test("use for await loop", async () => {
  const array = [[1, 2, 3, 4, 5], [6, 7, 8]]
  const batchIterable = new BatchIterable(array)
  let i = 0
  for await (const item of batchIterable) {
    let j = 0
    for (const element of item) {
      assert.deepStrictEqual(
        element,
        array[i][j],
        "Element should match expected output",
      )
      j++
    }
    i++
  }
})

test("use toAsyncIterable", async () => {
  const array = [[1, 2, 3, 4, 5], [6, 7, 8]]
  const result = array.flat()
  const batchIterable = new BatchIterable(array)
  let i = 0
  for await (const item of batchIterable.toAsyncIterable()) {
      assert.deepStrictEqual(
        item,
        result[i],
        "Element should match expected output",
      )
    i++
  }
})
