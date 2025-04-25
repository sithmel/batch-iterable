// @ts-check
/**
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {import("./types").BatchIterable<T>}
 */
export async function* iterableToBatchIterable(iterable) {
  yield iterable
}
