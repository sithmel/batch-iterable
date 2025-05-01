// @ts-check

/**
 * @template T, U
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(accumulator: U, currentValue: T, currentIndex: number) => U} reducer
 * @param {U} [initialValue] initial value.
 * @returns {Promise<U>}
 */
export default async function reduce(iterable, reducer, initialValue) {
  let index = 0
  let accumulator
  if (initialValue !== undefined) {
    accumulator = initialValue
    for await (const batch of iterable) {
      for (const item of batch) {
        accumulator = reducer(accumulator, item, index++)
      }
    }
  } else {
    for await (const batch of iterable) {
      for (const item of batch) {
        if (index === 0) {
          accumulator = item
          index++
        } else {
          // @ts-ignore
          accumulator = reducer(accumulator, item, index++)
        }
      }
    }
  }

  if (accumulator === undefined) {
    throw new TypeError("Reduce of empty iterable with no initial value")
  }
  // @ts-ignore
  return accumulator
}
