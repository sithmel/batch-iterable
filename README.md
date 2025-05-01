# batch-iterable

`batch-iterable` is a JavaScript library designed to provide utility functions for working with "async iterables of iterables". It offers a collection of methods to manipulate, transform, and process data in batch or stream-like workflows. This library is particularly useful for handling large datasets or streams of data efficiently.

## Why

This library is designed to support the transformation of data that are progressively parsed from a stream.
The stream, because of its asynchronous nature can be abstracted as AsyncIterable. The parsing produces instead a synchronous iterable and it would be very inefficient to use AsyncIterable for it.
This necessity arose while implementing my own JSON parsing library JSONaut (formerly called json-key-value).

## Features

- **Batch Processing**: Convert iterables and async iterables into batches for efficient processing.
- **Transformation Utilities**: Includes functions like `map`, `filter`, and `flatMap` to transform data.
- **Stream Control**: Functions like `take`, `drop`, and `reduce` to control and aggregate data streams.
- **Asynchronous Support**: Works seamlessly with async iterables for handling asynchronous data sources.

## Installation

Install the library using npm:

```bash
npm install batch-iterable
```

## Usage

Here are a few examples of how to use `batch-iterable`:

```javascript
import BatchIterable from 'batch-iterable';

const total = new BatchIterable([[1, 2], [3, 4, 5]]);
  .map(x => x * 2) // [2, 4, 6, 8, 10]
  .filter(x => x > 5) // [6, 8, 10]
  .reduce((acc, val) => acc + val, 0) // 24
```

This is an example on how generate and consume a batchIterable:

```javascript
import fs from "fs"
import BatchIterable from "batch-iterable"

// This returns an iterable
function* chunkToByte(chunk) {
  for (const byte of chunk) {
    yield String.fromCharCode(character)
  }
}

// This returns an AsyncIterable of Iterables (batchIterable)
async function* readASCIIFile(filename) {
  const readStream = fs.createReadStream(filename)

  for await (const chunk of readStream) {
    yield chunkToByte(chunk)
    // Important!
    // it is not "yield *" otherwise it would have converted the iterable in an asyncIterable
  }
  readStream.destroy()
}

const characters = readASCIIFile("README.md")
const characters_without_spaces = new BatchIterable(characters).filter(
  (char) => char !== " ",
)

;async () => {
  for await (const characters of characters_without_spaces) {
    for (const character of characters) {
      console.log(character)
    }
  }
}

// or

characters_without_spaces.forEach((character) => {
  console.log(character)
})
```

## BatchIterable Constructor

It can take either a:

- AsyncIterables of iterables
- Iterable of iterable (useful for testing)
- BatchIterable

## Instance attributes

### iterable

This is the attribute where the asyncIterable of iterables is stored

## Instance methods

### Symbol.asyncIterator

It returns the asyncIterator belonging to `iterable`. So that you can use it in a for loop.

### drop

Skips the first `n` elements of a batchIterable.

### every

Checks if all elements in a batchIterable satisfy a condition.

### filter

Filters elements of a batchIterable based on a predicate function.

### find

Finds the first element in a batchIterable that satisfies a condition.

### flatMap

Maps each element to a batchIterable and flattens the result.

### forEach

Executes a provided function once for each element in a batchIterable.

### map

Applies a function to each element of a batchIterable.

### reduce

Reduces an batchIterable to a single value using a reducer function.

### some

Checks if at least one element in a batchIterable satisfies a condition.

### take

Takes the first `n` elements of a batchIterable.

### toArray

Returns a promise with an array that collect all elements of a batchIterable. It is useful mostly for testing purposes.

### toAsyncIterable

It flattens the asyncIterable of iterables in a single asyncIterable.
