/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => boolean} predicate
 * @returns {Promise<boolean>}
 */
export default function some<T>(iterable: import("./types").BatchIterable<T>, predicate: (item: T, index: number) => boolean): Promise<boolean>;
//# sourceMappingURL=some.d.ts.map