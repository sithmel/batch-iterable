/**
 * @template T
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => boolean} predicate
 * @returns {Promise<boolean>}
 */
export default async function some(iterable, predicate) {
  let index = 0
  for await (const batch of iterable) {
    for (const item of batch) {
      if (predicate(item, index++)) {
        return true
      }
    }
  }
  return false
}
