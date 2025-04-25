// @ts-check

/**
 * @template T, R
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => Iterable<R> | R} func
 * @returns {import("./types").BatchIterable<R>}
 */
export default async function* flatMap(iterable, func) {
  let index = 0
  /**
   * @param {Iterable<T>} iterable
   * @returns {Iterable<R>}
   */
  function* syncFlatMap(iterable) {
    for (const item of iterable) {
      const result = func(item, index++)
      if (typeof result === 'string') {throw new TypeError('flatMap: Iterator.prototype.flatMap called on non-object')}
      if (result && typeof result === "object" && Symbol.iterator in result) {
        yield* result
      } else {
        yield result
      }
    }
  }

  for await (const batch of iterable) {
    yield syncFlatMap(batch)
  }
}
