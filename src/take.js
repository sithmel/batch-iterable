/**
 * @template T
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {number} count
 * @returns {AsyncIterable<Iterable<T>>}
 */
export default async function* take(iterable, count) {
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
