/**
 * @template T, R
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(accumulator: R, item: T, index: number) => R} reducer
 * @param {R} initialValue
 * @returns {Promise<R>}
 */
export default function reduce<T, R>(iterable: import("./types").BatchIterable<T>, reducer: (accumulator: R, item: T, index: number) => R, initialValue: R): Promise<R>;
//# sourceMappingURL=reduce.d.ts.map