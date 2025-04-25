/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @returns {Promise<Array<T>>}
 */
export async function toArray(iterable) {
  const result = []
  for await (const batch of iterable) {
    result.push(...batch)
  }
  return result
}
