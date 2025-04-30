/**
 * @template T
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => boolean} predicate
 * @returns {Promise<T| undefined>}
 */
export default function find<T>(iterable: AsyncIterable<Iterable<T>>, predicate: (item: T, index: number) => boolean): Promise<T | undefined>;
//# sourceMappingURL=find.d.ts.map