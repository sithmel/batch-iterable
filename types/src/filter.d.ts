/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => boolean} func
 * @returns {import("./types").BatchIterable<T>}
 */
export default function filter<T>(iterable: import("./types").BatchIterable<T>, func: (item: T, index: number) => boolean): import("./types").BatchIterable<T>;
//# sourceMappingURL=filter.d.ts.map