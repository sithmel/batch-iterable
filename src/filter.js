// @ts-check

/**
 * @template T
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => boolean} func
 * @returns {AsyncIterable<Iterable<T>>}
 */
export default async function* filter(iterable, func) {
  let index = 0
  /**
   * @param {Iterable<T>} iterable
   * @returns {Iterable<T>}
   */
  function* syncFilter(iterable) {
    for (const item of iterable) {
      if (func(item, index++)) {
        yield item
      }
    }
  }

  for await (const batch of iterable) {
    yield syncFilter(batch)
  }
}
