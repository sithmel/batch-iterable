/**
 * @template T
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => void} callback
 * @returns {Promise<void>}
 */
export default function forEach<T>(
  iterable: AsyncIterable<Iterable<T>>,
  callback: (item: T, index: number) => void,
): Promise<void>
//# sourceMappingURL=forEach.d.ts.map
