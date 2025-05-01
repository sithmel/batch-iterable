/**
 * @template T
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => boolean} func
 * @returns {AsyncIterable<Iterable<T>>}
 */
export default function filter<T>(
  iterable: AsyncIterable<Iterable<T>>,
  func: (item: T, index: number) => boolean,
): AsyncIterable<Iterable<T>>
//# sourceMappingURL=filter.d.ts.map
