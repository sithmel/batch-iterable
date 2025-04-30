/**
 * @template T
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {number} count
 * @returns {AsyncIterable<Iterable<T>>}
 */
export default async function* drop(iterable, count) {
  /**
   * @template T
   * @param {Iterable<T>} batch
   * @returns {Iterable<T>}
   */
  function *  dropSync(batch) {
    for (const item of batch) {
      if (count > 0) {
        count--;
        continue;
      }
      yield item;
    }
  }

  for await (const batch of iterable) {
    yield dropSync(batch);
  }
}


