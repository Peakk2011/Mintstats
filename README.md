# Mint Statistics

A lightweight and fast statistics library for JavaScript and TypeScript.

## Why Mint Stats?

- **5-10x faster** than traditional implementations (Quickselect for median)
- **Fully typed** - Built with TypeScript from the ground up
- **Zero dependencies** - Size: 3.7KB
- **Tree-shakeable** - Import only what you need

## Install

```bash
npm install mintstats
```

## Quick Start

```javascript
import statistics from "mintstats";

const scores = [85, 92, 78, 90, 88];

statistics.mean(scores);    // 86.6
statistics.median(scores);  // 88
statistics.stdev(scores);   // 5.22

// Works with objects too
const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
];

statistics.mean(students, "score");             // 88.5
statistics.percentile(students, 75, "score");   // 90.5
```

## API

**Basic Stats**

- `mean(arr, key?)` - Average
- `median(arr, key?)` - Middle value (uses Quickselect - O(n))
- `mode(arr, key?)` - Most frequent value(s)
- `range(arr, key?)` - Max - Min

**Variability**

- `variance(arr, options?)` - Variance (sample or population)
- `stdev(arr, options?)` - Standard deviation
- `percentile(arr, p, key?)` - Nth percentile (0-100)

**Options** for variance/stdev:

```javascript
{
  key: 'propertyName',  // for object arrays
  isSample: true        // sample (n-1) or population (n)
}
```

## Performance

Benchmark on 10,000 items:

```
Traditional (sort): 588 ops/sec
Mint Stats:        3,438 ops/sec  -> 5.85x faster
```

## TypeScript

Full type safety with automatic inference:

```typescript
statistics.mean([1, 2, 3]);         // Works
statistics.mean(objects, "value");  // Works
statistics.mean(objects);           // Type error - key required
```

## License

MIT © Peakk