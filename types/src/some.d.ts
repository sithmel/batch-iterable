/**
 * @template T
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => boolean} predicate
 * @returns {Promise<boolean>}
 */
export default function some<T>(iterable: AsyncIterable<Iterable<T>>, predicate: (item: T, index: number) => boolean): Promise<boolean>;
//# sourceMappingURL=some.d.ts.map