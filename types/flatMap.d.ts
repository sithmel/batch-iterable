/**
 * @template T, R
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => Iterable<R> | R} func
 * @returns {import("./types").BatchIterable<R>}
 */
export default function flatMap<T, R>(iterable: import("./types").BatchIterable<T>, func: (item: T, index: number) => Iterable<R> | R): import("./types").BatchIterable<R>;
//# sourceMappingURL=flatMap.d.ts.map