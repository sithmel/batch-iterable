// @ts-check

import drop from "./drop.js"
import filter from "./filter.js"
import forEach from "./forEach.js"
import map from "./map.js"
import reduce from "./reduce.js"
import take from "./take.js"
import every from "./every.js"
import some from "./some.js"
import find from "./find.js"
import toArray from "./toArray.js"
import flatMap from "./flatMap.js"

/**
 * @template T
 *
 * @param {AsyncIterable<Iterable<T>> | Iterable<Iterable<T>>} iterable
 * @returns {AsyncIterable<Iterable<T>>}
 */
async function* toAsyncIterable(iterable) {
  for await (const item of iterable) {
    yield item
  }
}

/**
 * @template T
 */
class GenericBatchIterable {
  /**
   * @param {AsyncIterable<Iterable<T>> | Iterable<Iterable<T>> | GenericBatchIterable<T>} [_iterable]
   */
  constructor(_iterable) {
    /** @type {AsyncIterable<Iterable<T>> | Iterable<Iterable<T>> | GenericBatchIterable<T>}*/
    _iterable = _iterable ?? []
    if (_iterable instanceof GenericBatchIterable) {
      return _iterable
    } else if (Symbol.iterator in _iterable) {
      /** @type  {AsyncIterable<Iterable<T>>}  */
      this.iterable = toAsyncIterable(_iterable)
    } else if (Symbol.asyncIterator in _iterable) {
      /** @type  {AsyncIterable<Iterable<T>>}  */
      this.iterable = _iterable
    } else throw new TypeError("Invalid iterable type")
  }

  [Symbol.asyncIterator]() {
    return this.iterable[Symbol.asyncIterator]()
  }

  /**
   * @param {number} n
   * @returns {this}
   */
  take(n) {
    this.iterable = take(this.iterable, n)
    return this
  }

  /**
   * @param {number} n
   * @returns {this}
   */
  drop(n) {
    this.iterable = drop(this.iterable, n)
    return this
  }

  /**
   * @param {(item: T, index: number) => boolean} func
   * @returns {this}
   */
  filter(func) {
    this.iterable = filter(this.iterable, func)
    return this
  }

  /**
   * @param {(item: T, index: number) => T} func
   * @returns {this}
   */
  map(func) {
    this.iterable = map(this.iterable, func)
    return this
  }
  /**
   * @param {(item: T, index: number) => Iterable<T> | T} func
   * @returns {this}
   */

  flatMap(func) {
    this.iterable = flatMap(this.iterable, func)
    return this
  }
  /**
   * @param {(item: T, index: number) => void} func
   * @returns {Promise<void>}
   */

  forEach(func) {
    return forEach(this.iterable, func)
  }

  /**
   * @template U
   * @param {(acc: U, item: T, index: number) => U} func
   * @param {U} [initialValue]
   * @returns {Promise<U>}
   */
  reduce(func, initialValue) {
    return reduce(this.iterable, func, initialValue)
  }

  /**
   * @param {(item: T, index: number) => boolean} predicate
   * @returns {Promise<boolean>}
   */
  every(predicate) {
    return every(this.iterable, predicate)
  }

  /**
   * @param {(item: T, index: number) => boolean} predicate
   * @returns {Promise<boolean>}
   */
  some(predicate) {
    return some(this.iterable, predicate)
  }

  /**
   * @param {(item: T, index: number) => boolean} predicate
   * @returns {Promise<T | undefined>}
   */
  find(predicate) {
    return find(this.iterable, predicate)
  }

  /**
   * @returns {Promise<T[]>}
   */
  toArray() {
    return toArray(this.iterable)
  }

  /**
   * @returns {AsyncIterable<T>}
   */
  async *toAsyncIterable() {
    for await (const batch of this.iterable) {
      yield* batch
    }
  }

  /**
   * Returns a general purpose batchiterable which is less strict in typing
   * but lacks methods that requires the correct types to be enforced
   * @returns {GenericBatchIterable<any>}
   */
  toBatchIterable() {
    return new GenericBatchIterable(this.iterable)
  }
}

export default GenericBatchIterable
