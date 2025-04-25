// @ts-check
/**
 * @template T
 * @param {AsyncIterable<T>} iterable
 * @returns {import("./types").BatchIterable<T>}
 */
export async function* iterableToBatchIterable(iterable) {
  for await (const item of iterable) {
    yield [item]
  }
}
