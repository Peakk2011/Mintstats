import Benchmark from 'benchmark';
import statistics from '../mintstats.js';

const sortBasedMedian = (arr) => {
    if (arr.length === 0) return 0;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const quickselectMedian = (arr) => {
    return statistics.median(arr);
};

// Test Data
// Generate a large array of random numbers for a realistic test

const largeArray = Array.from({ length: 10000 }, () => Math.random() * 1000);
console.log(`Running benchmark on an array with ${largeArray.length}`);

// Benchmark Suite

const suite = new Benchmark.Suite;

suite
    .add('Median Sort-based O(n log n)', () => {
        sortBasedMedian(largeArray);
    })
    .add('Median Quickselect 0', () => {
        quickselectMedian(largeArray);
    })
    .on('cycle', (event) => {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('\nFastest is ' + this.filter('fastest').map('name'));
    })
    .run();

// To run: node benchmarks/median.bench.js