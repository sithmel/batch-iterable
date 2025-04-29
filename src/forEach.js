// @ts-check
/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => void} callback
 * @returns {Promise<void>}
 */
export default async function forEach(iterable, callback) {
  let index = 0;
  for await (const batch of iterable) {
    for (const item of batch) {
      callback(item, index++);
    }
  }
}