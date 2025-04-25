/**
 * @template T
 * @param {import("./types").BatchIterable<T>} iterable
 * @param {(item: T, index: number) => void | Promise<void>} callback
 * @returns {Promise<void>}
 */
export default function forEach<T>(iterable: import("./types").BatchIterable<T>, callback: (item: T, index: number) => void | Promise<void>): Promise<void>;
//# sourceMappingURL=forEach.d.ts.map