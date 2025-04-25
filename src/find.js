/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => boolean} predicate
 * @returns {Promise<T| undefined>}
 */
export async function find(iterable, predicate) {
    let index = 0;
    for await (const batch of iterable) {
      for (const item of batch) {
        if (predicate(item, index++)) {
          return item
        }
      }
    }
    return undefined;
  }