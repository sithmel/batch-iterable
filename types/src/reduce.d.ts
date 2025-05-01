/**
 * @template T, U
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(accumulator: U, currentValue: T, currentIndex: number) => U} reducer
 * @param {U} [initialValue] initial value.
 * @returns {Promise<U>}
 */
export default function reduce<T, U>(
  iterable: AsyncIterable<Iterable<T>>,
  reducer: (accumulator: U, currentValue: T, currentIndex: number) => U,
  initialValue?: U,
): Promise<U>
//# sourceMappingURL=reduce.d.ts.map
