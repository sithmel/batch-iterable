/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {number} count
 * @returns {import("./types").BatchIterable<T>}
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


