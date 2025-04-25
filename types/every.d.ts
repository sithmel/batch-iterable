/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => boolean} predicate
 * @returns {Promise<boolean>}
 */
export function every<T>(iterable: import("./types").BatchIterable<T>, predicate: (item: T, index: number) => boolean): Promise<boolean>;
//# sourceMappingURL=every.d.ts.map