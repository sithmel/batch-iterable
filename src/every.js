/**
 * @template T
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => boolean} predicate
 * @returns {Promise<boolean>}
 */
export default async function every(iterable, predicate) {
  let index = 0
  for await (const batch of iterable) {
    for (const item of batch) {
      if (!predicate(item, index++)) {
        return false
      }
    }
  }
  return true
}
