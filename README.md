# batch-iterable

`batch-iterable` is a JavaScript library designed to provide utility functions for working with async iterables of iterables. It offers a collection of methods to manipulate, transform, and process data in batch or stream-like workflows. This library is particularly useful for handling large datasets or streams of data efficiently.

## Why
This library is designed to support the transformation of data that are progressively parsed from a stream.
The stream, because of its asynchronous nature can be abstracted as AsyncIterable. The parsing produces instead a synchronous iterable and it would be very inefficient to use AsyncIterable for it.
This necessity arised while implementing my own JSON parsing library JSONaut.


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

Here is an example of how to use `batch-iterable`:

```javascript
import { map, filter, reduce, iterableToBatchIterable } from 'batch-iterable';

const data = iterableToBatchIterable([1, 2, 3, 4, 5]);

// Example: Transform and filter data
const result = reduce(
  filter(
    map(data, x => x * 2),
    x => x > 5
  ),
  (acc, val) => acc + val,
  0
);

console.log(result); // Output: 14
```

## API Reference

### iterableToBatchIterable
Converts a synchronous iterable into a batchIterable.

### asyncIterableToBatchIterable
Converts an async iterable into a batchIterable.

### drop
Skips the first `n` elements of a batchIterable.

### every
Checks if all elements in an batchIterable satisfy a condition.

### filter
Filters elements of an batchIterable based on a predicate function.

### find
Finds the first element in an batchIterable that satisfies a condition.

### flatMap
Maps each element to a batchIterable and flattens the result.

### forEach
Executes a provided function once for each element in an batchIterable.

### map
Applies a function to each element of an batchIterable.

### reduce
Reduces an batchIterable to a single value using a reducer function.

### some
Checks if at least one element in an batchIterable satisfies a condition.

### take
Takes the first `n` elements of an batchIterable.

### types
Provides type definitions and utilities for working with iterables and async iterables.
