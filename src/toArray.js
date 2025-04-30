/**
 * @template T
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @returns {Promise<Array<T>>}
 */
export default async function toArray(iterable) {
  const result = []
  for await (const batch of iterable) {
    result.push(...batch)
  }
  return result
}
