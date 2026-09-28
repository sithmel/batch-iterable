/**
 * Like flatMap, but `func` may additionally return an
 * `AsyncIterable<Iterable<R>>`. When it does, iteration switches to that
 * sub-stream (the current async source and the current partially-consumed
 * batch are pushed onto a stack). When the sub-stream finishes, iteration
 * resumes from where it left off in the outer source.
 *
 * Items coming from a spliced sub-stream are yielded as-is (they are NOT
 * re-processed through `func`). The `index` counter is shared and only
 * incremented for items that flow through `func`, i.e. items originating
 * from the original outer source.
 *
 * No items are ever buffered into arrays; only live iterators are held on
 * the stack, and sync batches are produced via lazy generators.
 *
 * @template T, R
 * @param {AsyncIterable<Iterable<T>>} iterable
 * @param {(item: T, index: number) => Iterable<R> | R | AsyncIterable<Iterable<R>>} func
 * @returns {AsyncIterable<Iterable<R>>}
 */
export default function asyncFlatMap<T, R>(iterable: AsyncIterable<Iterable<T>>, func: (item: T, index: number) => Iterable<R> | R | AsyncIterable<Iterable<R>>): AsyncIterable<Iterable<R>>;
//# sourceMappingURL=asyncFlatMap.d.ts.map