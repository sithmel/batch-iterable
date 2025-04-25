/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => boolean} predicate
 * @returns {Promise<T| undefined>}
 */
export default function find<T>(iterable: import("./types").BatchIterable<T>, predicate: (item: T, index: number) => boolean): Promise<T | undefined>;
//# sourceMappingURL=find.d.ts.map