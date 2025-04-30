// @ts-check

/**
 * @template T,R
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => R} func
 * @returns {AsyncIterable<Iterable<R>>}
 */
export default async function* map(iterable, func) {
  let index = 0
  /**
   * @param {Iterable<T>} iterable
   * @returns {Iterable<R>}
   */
  function* syncMap(iterable) {
    for (const item of iterable) {
      yield func(item, index ++)
    }
  }

  for await (const batch of iterable) {
    yield syncMap(batch)
  }
}
