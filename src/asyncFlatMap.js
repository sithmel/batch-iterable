// @ts-check

/**
 * Like flatMap, but `func` may additionally return an
 * `AsyncIterable<Iterable<R>>`. When it does, iteration switches to that
 * sub-stream (the current async source and the current partially-consumed
 * batch are pushed onto a stack). When the sub-stream finishes, iteration
 * resumes from where it left off in the outer source.
 *
 * Items coming from a spliced sub-stream are yielded as-is (they are NOT
 * re-processed through `func`). The `index` counter is shared and only
 * incremented for items that flow through `func`, i.e. items originating
 * from the original outer source.
 *
 * No items are ever buffered into arrays; only live iterators are held on
 * the stack, and sync batches are produced via lazy generators.
 *
 * @template T, R
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => Iterable<R> | R | AsyncIterable<Iterable<R>>} func
 * @returns {AsyncIterable<Iterable<R>>}
 */
export default async function* asyncFlatMap(iterable, func) {
  let index = 0

  /**
   * @typedef {Object} Frame
   * @property {AsyncIterator<Iterable<any>>} outer  Async iterator we're pulling batches from.
   * @property {Iterator<T> | null} partial          Live iterator over a partially-consumed batch (only for non-splice frames).
   * @property {boolean} isSplice                    True if this frame is a spliced sub-stream (its batches are Iterable<R> and must be forwarded as-is).
   */

  /** @type {Frame[]} */
  const stack = []

  // Shared box used by the sync generator to signal to the async driver that
  // `func` returned an AsyncIterable and the batch was terminated early so we
  // can splice it in.
  /** @type {{ pending: AsyncIterable<Iterable<R>> | null }} */
  const spliceRequest = { pending: null }

  /**
   * Walks a live sync iterator of T, calling `func` on each item and yielding
   * `R` values. Returns early (leaving `it` partially consumed) if `func`
   * returns an AsyncIterable — in that case the sub-stream is stashed on
   * `spliceRequest` for the async driver to pick up.
   *
   * NOTE: this relies on the same assumption as the existing flatMap: the
   * consumer of the outer async iterable will fully drain each yielded sync
   * batch before requesting the next one. In async generator land, `yield x`
   * suspends until the consumer calls `.next()`, so by the time control comes
   * back to us the sync generator has run to completion (or to its early
   * `return`), meaning `spliceRequest.pending` reflects the true state.
   *
   * @param {Iterator<T>} it
   * @returns {Iterable<R>}
   */
  function* processBatch(it) {
    while (true) {
      const step = it.next()
      if (step.done) return
      const item = step.value
      const result = func(item, index++)
      if (typeof result === "string") {
        throw new TypeError(
          "asyncFlatMap: Iterator.prototype.flatMap called on non-object",
        )
      }
      if (result !== null && typeof result === "object") {
        if (Symbol.asyncIterator in result) {
          // Splice: stash sub-stream and end this sync batch here. The outer
          // driver will push a new frame and forward the sub-stream's batches.
          spliceRequest.pending =
            /** @type {AsyncIterable<Iterable<R>>} */ (result)
          return
        }
        if (Symbol.iterator in result) {
          yield* /** @type {Iterable<R>} */ (result)
          continue
        }
      }
      // scalar (non-string, non-iterable): yield as-is
      yield /** @type {R} */ (result)
    }
  }

  // Seed the stack with the original source.
  stack.push({
    outer: iterable[Symbol.asyncIterator](),
    partial: null,
    isSplice: false,
  })

  while (stack.length > 0) {
    const frame = stack[stack.length - 1]

    // Resume a partially-consumed batch from before a splice.
    if (frame.partial) {
      const it = frame.partial
      frame.partial = null
      yield processBatch(it)
      if (spliceRequest.pending) {
        const sub = spliceRequest.pending
        spliceRequest.pending = null
        // The `it` is still live (processBatch returned early). Stash it back
        // so we can resume after the splice unwinds.
        frame.partial = it
        stack.push({
          outer: sub[Symbol.asyncIterator](),
          partial: null,
          isSplice: true,
        })
      }
      continue
    }

    // Pull next batch from the top-of-stack async iterator.
    const step = await frame.outer.next()
    if (step.done) {
      stack.pop()
      continue
    }

    const batch = step.value

    if (frame.isSplice) {
      // Forward spliced batches unchanged.
      yield /** @type {Iterable<R>} */ (batch)
      continue
    }

    // Non-splice frame: batch is Iterable<T> and must flow through `func`.
    const it = /** @type {Iterable<T>} */ (batch)[Symbol.iterator]()
    yield processBatch(it)
    if (spliceRequest.pending) {
      const sub = spliceRequest.pending
      spliceRequest.pending = null
      frame.partial = it
      stack.push({
        outer: sub[Symbol.asyncIterator](),
        partial: null,
        isSplice: true,
      })
    }
  }
}
