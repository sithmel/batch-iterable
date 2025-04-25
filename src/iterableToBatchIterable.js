// @ts-check
/**
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {import("./types").BatchIterable<T>}
 */
export default async function* iterableToBatchIterable(iterable) {
  yield iterable
}
