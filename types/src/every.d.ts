/**
 * @template T
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => boolean} predicate
 * @returns {Promise<boolean>}
 */
export default function every<T>(iterable: AsyncIterable<Iterable<T>>, predicate: (item: T, index: number) => boolean): Promise<boolean>;
//# sourceMappingURL=every.d.ts.map