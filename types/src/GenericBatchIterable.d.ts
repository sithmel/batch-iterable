export default GenericBatchIterable
/**
 * @template T
 */
declare class GenericBatchIterable<T> {
  /**
   * @param {AsyncIterable<Iterable<T>> | Iterable<Iterable<T>> | GenericBatchIterable<T>} [_iterable]
   */
  constructor(
    _iterable?:
      | AsyncIterable<Iterable<T>>
      | Iterable<Iterable<T>>
      | GenericBatchIterable<T>,
  )
  /** @type  {AsyncIterable<Iterable<T>>}  */
  iterable: AsyncIterable<Iterable<T>>
  /**
   * @param {number} n
   * @returns {this}
   */
  take(n: number): this
  /**
   * @param {number} n
   * @returns {this}
   */
  drop(n: number): this
  /**
   * @param {(item: T, index: number) => boolean} func
   * @returns {this}
   */
  filter(func: (item: T, index: number) => boolean): this
  /**
   * @param {(item: T, index: number) => T} func
   * @returns {this}
   */
  map(func: (item: T, index: number) => T): this
  /**
   * @param {(item: T, index: number) => Iterable<T> | T} func
   * @returns {this}
   */
  flatMap(func: (item: T, index: number) => Iterable<T> | T): this
  /**
   * @param {(item: T, index: number) => void} func
   * @returns {Promise<void>}
   */
  forEach(func: (item: T, index: number) => void): Promise<void>
  /**
   * @template U
   * @param {(acc: U, item: T, index: number) => U} func
   * @param {U} [initialValue]
   * @returns {Promise<U>}
   */
  reduce<U>(
    func: (acc: U, item: T, index: number) => U,
    initialValue?: U,
  ): Promise<U>
  /**
   * @param {(item: T, index: number) => boolean} predicate
   * @returns {Promise<boolean>}
   */
  every(predicate: (item: T, index: number) => boolean): Promise<boolean>
  /**
   * @param {(item: T, index: number) => boolean} predicate
   * @returns {Promise<boolean>}
   */
  some(predicate: (item: T, index: number) => boolean): Promise<boolean>
  /**
   * @param {(item: T, index: number) => boolean} predicate
   * @returns {Promise<T | undefined>}
   */
  find(predicate: (item: T, index: number) => boolean): Promise<T | undefined>
  /**
   * @returns {Promise<T[]>}
   */
  toArray(): Promise<T[]>
  /**
   * @returns {AsyncIterable<T>}
   */
  toAsyncIterable(): AsyncIterable<T>
  /**
   * Returns a general purpose batchiterable which is less strict in typing
   * but lacks methods that requires the correct types to be enforced
   * @returns {GenericBatchIterable<any>}
   */
  toBatchIterable(): GenericBatchIterable<any>
  [Symbol.asyncIterator](): AsyncIterator<Iterable<T>, any, any>
}
//# sourceMappingURL=GenericBatchIterable.d.ts.map
