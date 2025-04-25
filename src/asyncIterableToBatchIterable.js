// @ts-check
/**
 * @template T
 * @param {AsyncIterable<T>} iterable
 * @returns {import("./types").BatchIterable<T>}
 */
export default async function* iterableToBatchIterable(iterable) {
  for await (const item of iterable) {
    yield [item]
  }
}
