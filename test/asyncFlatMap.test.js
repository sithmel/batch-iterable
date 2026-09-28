import test from "node:test"
import assert from "node:assert"
import { BatchIterable } from "../index.js"

/**
 * Turn a plain array of batches into an AsyncIterable<Iterable<T>>.
 * Used to build sub-streams passed back from func for splice tests.
 */
async function* asBatchAsyncIterable(batches) {
  for (const b of batches) yield b
}

// ---------------------------------------------------------------------------
// Base behaviors (mirror of flatMap.test.js, to guarantee the non-splice path
// still works exactly like flatMap).
// ---------------------------------------------------------------------------

test("asyncFlatMap maps and flattens elements", async () => {
  const array = new BatchIterable([[1, 2, 3]])
  const duplicate = (x) => [x, x]

  const result = await array.asyncFlatMap(duplicate).toArray()

  assert.deepStrictEqual(
    result,
    [1, 1, 2, 2, 3, 3],
    "Mapped and flattened elements should match expected output",
  )
})

test("asyncFlatMap with empty input", async () => {
  const array = new BatchIterable([])
  const duplicate = (x) => [x, x]

  const result = await array.asyncFlatMap(duplicate).toArray()

  assert.deepStrictEqual(
    result,
    [],
    "asyncFlatMap should return an empty array for empty input",
  )
})

test("asyncFlatMap with nested arrays", async () => {
  const array = new BatchIterable([
    [
      [1, 2],
      [3, 4],
    ],
  ])
  const flatten = (x) => x

  const result = await array.asyncFlatMap(flatten).toArray()

  assert.deepStrictEqual(
    result,
    [1, 2, 3, 4],
    "asyncFlatMap should flatten nested arrays",
  )
})

test("asyncFlatMap with transformation", async () => {
  const array = new BatchIterable([[1], [2, 3]])
  const transform = (x) => [x * 2]

  const result = await array.asyncFlatMap(transform).toArray()

  assert.deepStrictEqual(
    result,
    [2, 4, 6],
    "asyncFlatMap should apply the transformation function",
  )
})

test("asyncFlatMap with scalar output", async () => {
  const array = new BatchIterable([[1, 2, 3]])
  const toScalar = (x) => x * 2

  const result = await array.asyncFlatMap(toScalar).toArray()

  assert.deepStrictEqual(
    result,
    [2, 4, 6],
    "asyncFlatMap should handle scalar outputs correctly",
  )
})

test("asyncFlatMap throws an exception if the function returns a string", async () => {
  const array = new BatchIterable([[1], [2, 3]])
  const toString = (x) => `${x}`

  await assert.rejects(
    async () => {
      await array.asyncFlatMap(toString).toArray()
    },
    /TypeError: asyncFlatMap: Iterator.prototype.flatMap called on non-object/,
    "asyncFlatMap should throw an exception if the function returns a string",
  )
})

test("asyncFlatMap uses index in callback to flatten and transform elements", async () => {
  const array = new BatchIterable([["a", "b", "c"]])
  const result = await array
    .asyncFlatMap((value, index) => [value, index])
    .toArray()

  assert.deepStrictEqual(
    result,
    ["a", 0, "b", 1, "c", 2],
    "Flat-mapped elements based on index should match expected output",
  )
})

// ---------------------------------------------------------------------------
// New splice behaviors.
// ---------------------------------------------------------------------------

test("asyncFlatMap splices an AsyncIterable returned by func in the middle of a batch", async () => {
  const array = new BatchIterable([[1, 2, 3]])
  const result = await array
    .asyncFlatMap((x) =>
      x === 2 ? asBatchAsyncIterable([[10, 20]]) : x,
    )
    .toArray()

  assert.deepStrictEqual(
    result,
    [1, 10, 20, 3],
    "Sub-stream items should appear between items from earlier and later items in the same batch",
  )
})

test("asyncFlatMap splices at the very first item of a batch", async () => {
  const array = new BatchIterable([[1, 2]])
  const result = await array
    .asyncFlatMap((x) =>
      x === 1 ? asBatchAsyncIterable([[100]]) : x,
    )
    .toArray()

  assert.deepStrictEqual(
    result,
    [100, 2],
    "Splice at the head of the batch should leave no prefix",
  )
})

test("asyncFlatMap splices at the very last item of a batch", async () => {
  const array = new BatchIterable([[1, 2]])
  const result = await array
    .asyncFlatMap((x) =>
      x === 2 ? asBatchAsyncIterable([[200]]) : x,
    )
    .toArray()

  assert.deepStrictEqual(
    result,
    [1, 200],
    "Splice at the tail of the batch should leave no suffix",
  )
})

test("asyncFlatMap forwards multiple sub-stream batches unchanged", async () => {
  const array = new BatchIterable([[1, 2, 3]])
  const result = await array
    .asyncFlatMap((x) =>
      x === 2 ? asBatchAsyncIterable([[10], [20, 30]]) : x,
    )
    .toArray()

  assert.deepStrictEqual(
    result,
    [1, 10, 20, 30, 3],
    "All sub-stream batches should be spliced in, then outer resumes",
  )
})

test("asyncFlatMap handles an empty spliced sub-stream", async () => {
  const array = new BatchIterable([[1, 2, 3]])
  const result = await array
    .asyncFlatMap((x) => (x === 2 ? asBatchAsyncIterable([]) : x))
    .toArray()

  assert.deepStrictEqual(
    result,
    [1, 3],
    "An empty sub-stream should just be a no-op for that item",
  )
})

test("asyncFlatMap resumes across the original batch boundary after a splice", async () => {
  const array = new BatchIterable([
    [1, 2],
    [3, 4],
  ])
  const result = await array
    .asyncFlatMap((x) =>
      x === 2 ? asBatchAsyncIterable([[10, 20]]) : x,
    )
    .toArray()

  assert.deepStrictEqual(
    result,
    [1, 10, 20, 3, 4],
    "After the sub-stream ends, iteration should continue with the next outer batch",
  )
})

test("asyncFlatMap handles two splices from non-adjacent items in the same batch", async () => {
  const array = new BatchIterable([[1, 2, 3]])
  const result = await array
    .asyncFlatMap((x) => {
      if (x === 1) return asBatchAsyncIterable([[10]])
      if (x === 3) return asBatchAsyncIterable([[30]])
      return x
    })
    .toArray()

  assert.deepStrictEqual(
    result,
    [10, 2, 30],
    "Two independent splices in the same batch should unwind and resume correctly",
  )
})

test("asyncFlatMap handles two splices from adjacent items in the same batch", async () => {
  const array = new BatchIterable([[1, 2]])
  const result = await array
    .asyncFlatMap((x) => {
      if (x === 1) return asBatchAsyncIterable([[10]])
      if (x === 2) return asBatchAsyncIterable([[20]])
      return x
    })
    .toArray()

  assert.deepStrictEqual(
    result,
    [10, 20],
    "Adjacent splices should unwind LIFO between them (each completes before the next starts)",
  )
})

test("asyncFlatMap only increments index for items passed through func", async () => {
  // "a", "b", "c" — when we see "b" we splice in a sub-stream whose items are
  // NOT re-processed. So index for "a" is 0, index for "b" is 1 (consumed), and
  // index for "c" is 2. Sub-stream items appear as-is with no index attached.
  const array = new BatchIterable([["a", "b", "c"]])
  const result = await array
    .asyncFlatMap((v, i) =>
      v === "b" ? asBatchAsyncIterable([["x", "y"]]) : [v, i],
    )
    .toArray()

  assert.deepStrictEqual(
    result,
    ["a", 0, "x", "y", "c", 2],
    "Sub-stream items are yielded as-is; index continues to advance for outer items",
  )
})

test("asyncFlatMap works when the sub-stream itself has multiple batches spanning outer items", async () => {
  // The sub-stream emits three batches; the outer batch is fully consumed only
  // after the whole sub-stream is drained.
  const array = new BatchIterable([[1, 2, 3, 4]])
  const result = await array
    .asyncFlatMap((x) =>
      x === 2
        ? asBatchAsyncIterable([[10], [20], [30]])
        : x,
    )
    .toArray()

  assert.deepStrictEqual(result, [1, 10, 20, 30, 3, 4])
})
