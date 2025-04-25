// @ts-check
/**
 * @template T, R
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(accumulator: R, item: T, index: number) => R} reducer
 * @param {R} initialValue
 * @returns {Promise<R>}
 */
export default async function reduce(iterable, reducer, initialValue) {
  let index = 0;
  let accumulator = initialValue;

  for await (const batch of iterable) {
    for (const item of batch) {
      accumulator = reducer(accumulator, item, index++);
    }
  }

  return accumulator;
}
