// @ts-check

/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => T} func
 * @returns {import("./types").BatchIterable<T>}
 */
export default async function* map(iterable, func) {
  let index = 0
  /**
   * @param {Iterable<T>} iterable
   * @returns {Iterable<T>}
   */
  function* syncMap(iterable) {
    for (const item of iterable) {
      yield func(item, index)
    }
  }

  for await (const batch of iterable) {
    yield syncMap(batch)
  }
}
