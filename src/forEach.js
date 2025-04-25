// @ts-check
/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => void | Promise<void>} callback
 * @returns {Promise<void>}
 */
export async function forEach(iterable, callback) {
    let index = 0;
  for await (const batch of iterable) {
    for (const item of batch) {
      await callback(item, index++);
    }
  }
}