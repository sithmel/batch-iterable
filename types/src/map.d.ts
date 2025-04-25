/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => T} func
 * @returns {import("./types").BatchIterable<T>}
 */
export default function map<T>(iterable: import("./types").BatchIterable<T>, func: (item: T, index: number) => T): import("./types").BatchIterable<T>;
//# sourceMappingURL=map.d.ts.map