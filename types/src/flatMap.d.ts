/**
 * @template T, R
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => Iterable<R> | R} func
 * @returns {AsyncIterable<Iterable<R>>}
 */
export default function flatMap<T, R>(
  iterable: AsyncIterable<Iterable<T>>,
  func: (item: T, index: number) => Iterable<R> | R,
): AsyncIterable<Iterable<R>>
//# sourceMappingURL=flatMap.d.ts.map
