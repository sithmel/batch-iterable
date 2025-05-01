/**
 * @template T,R
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => R} func
 * @returns {AsyncIterable<Iterable<R>>}
 */
export default function map<T, R>(
  iterable: AsyncIterable<Iterable<T>>,
  func: (item: T, index: number) => R,
): AsyncIterable<Iterable<R>>
//# sourceMappingURL=map.d.ts.map
