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
 * @param {Iterable<T>} iterable
 * @returns {AsyncIterable<Iterable<T>>}
 */
async function* iterableToAsyncIterableOfIterables(iterable) {
  yield iterable
}

/**
 * @template T
 * @param {AsyncIterable<T>} asyncIterable
 * @returns {AsyncIterable<Iterable<T>>}
 */
async function* asyncIterableToAsyncIterableOfIterables(asyncIterable) {
  for await (const item of asyncIterable) {
    yield [item]
  }
}

/**
 * @template T
 */
class BatchIterable {

  /**
   * @param {AsyncIterable<T> | Iterable<T> | BatchIterable<T>} [_iterable]
   */
  constructor(_iterable) {
    /** @type {AsyncIterable<T> | Iterable<T> | BatchIterable<T>}*/
    _iterable = _iterable ?? []
    if (_iterable instanceof BatchIterable) {
      return _iterable
    } else if (Symbol.asyncIterator in _iterable) {
      /** @type  AsyncIterable<Iterable<T>> */
      this.iterable = asyncIterableToAsyncIterableOfIterables(_iterable)
    } else if (Symbol.iterator in _iterable) {
      /** @type  AsyncIterable<Iterable<T>> */
      this.iterable = iterableToAsyncIterableOfIterables(_iterable)
    } else throw new TypeError("Invalid iterable type")
  }

  [Symbol.asyncIterator]() {
    return this.iterable[Symbol.asyncIterator]()
  }

  /**
   * @param {number} n
   * @returns {BatchIterable<T>}
   */
  take(n) {
    const b = new BatchIterable()
    b.iterable = take(this.iterable, n)
    return b
  }
  /**
   * @param {number} n
   * @returns {BatchIterable<T>}
   */
  drop(n) {
    const b = new BatchIterable()
    b.iterable = drop(this.iterable, n)
    return b
  }
  /**
   * @param {(item: T, index: number) => boolean} func
   * @returns {BatchIterable<T>}
   */
  filter(func) {
    const b = new BatchIterable()
    b.iterable = filter(this.iterable, func)
    return b
  }
  /**
   * @param {(item: T, index: number) => T} func
   * @returns {BatchIterable<T>}
   */
  map(func) {
    const b = new BatchIterable()
    b.iterable = map(this.iterable, func)
    return b
  }
  /**
   * @param {(item: T, index: number) => Iterable<T> | T} func
   * @returns {BatchIterable<T>}
   */
  flatMap(func) {
    const b = new BatchIterable()
    b.iterable = flatMap(this.iterable, func)
    return b
  }
  /**
   * @param {(item: T, index: number) => void} func
   * @returns {Promise<void>}
   */
  forEach(func) {
    return forEach(this.iterable, func)
  }
  /**
   * @param {(acc: T, item: T, index: number) => T} func
   * @param {T} [initialValue]
   * @returns {Promise<T>}
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
}

export default BatchIterable
