import Benchmark from 'benchmark';
import statistics from '../mintstats.js';

const sortBasedMedian = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const quickselectMedian = (arr: number[]): number => {
    return statistics.median(arr);
};

// Test Data
// Generate a large array of random numbers for a realistic test
const largeArray: number[] = Array.from(
    { length: 10000 }, () => Math.random() * 1000
);

console.log(`Running benchmark on an array with ${largeArray.length} items...`);

// Benchmark Suite
const suite: Benchmark.Suite = new Benchmark.Suite;

suite
    .add('Median Sort-based O(n log n)', () => {
        sortBasedMedian(largeArray);
    })
    .add('Median Quickselect', () => {
        quickselectMedian(largeArray);
    })
    .on('cycle', (event: Benchmark.Event) => {
        console.log(String(event.target));
    })
    .on('complete', function (this: Benchmark.Suite) {
        console.log('\nFastest is ' + this.filter('fastest').map('name'));
    })
    .run();

// To run this benchmark after compilation:
// 1. Run `npm run build`
// 2. Run `node dist/benchmarks/median.bench.js`
