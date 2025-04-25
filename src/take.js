/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {number} count
 * @returns {import("./types").BatchIterable<T>}
 */
export async function* take(iterable, count) {
  /**
   * @template T
   * @param {Iterable<T>} batch
   * @returns {Iterable<T>}
   */

  function* takeSync(batch) {
    for (const item of batch) {
      if (count > 0) {
        count--
        yield item
      }
    }
  }
  for await (const batch of iterable) {
    if (count <= 0) {
      break
    }
    yield takeSync(batch)
  }
}
