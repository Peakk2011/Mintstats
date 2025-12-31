// Define the types for the input data
type DataObject = Record<string, any>;
type NumberArray = number[];
type ObjectArray = DataObject[];

// Define the interface for variance and stdev options
interface VarianceOptions {
    key?: string;
    isSample?: boolean;
}

/**
 * Calculates the median of a pre-sorted array of numbers.
 * @param arr The sorted array of numbers.
 * @returns The median of the numbers.
 */
const medianOf = (arr: number[]): number => {
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
};

/**
 * Extracts and validates numbers from a mixed array or an array of objects.
 * @param arr The input array.
 * @param key The key to extract values from if `arr` is an array of objects.
 * @returns An array of numbers.
 * @throws {TypeError} If the input is not an array or if a non-numeric value is found.
 */
const extractNumbers = (arr: NumberArray | ObjectArray, key?: string): number[] => {
    if (!Array.isArray(arr)) {
        throw new TypeError("Input must be an array.");
    }
    
    if (arr.length === 0) {
        return [];
    }
    
    // Type guard: if key is provided, treat as ObjectArray, else as NumberArray
    const mapped: any[] = key 
        ? (arr as ObjectArray).map(obj => obj[key]) 
        : arr;
    
    const numbers: number[] = [];

    for (let i = 0; i < mapped.length; i++) {
        const value = mapped[i];
        if (value === null || value === undefined) continue;
        if (typeof value !== 'number' || !isFinite(value)) {
            throw new TypeError(`Invalid non-numeric value found at index ${i}: ${value}`);
        }
        numbers.push(value);
    }
    
    return numbers;
};

/**
 * Rounds a number to a specified number of decimal places.
 * @param value The number to round.
 * @param precision The number of decimal places.
 * @returns The rounded number.
 */
const toFixedNumber = (value: number, precision: number = 10): number => {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
};

/**
 * Calculates the mean (average) of a set of numbers.
 * @param arr The array of objects or numbers.
 * @param key The key to extract values from if `arr` is an array of objects.
 * @returns The mean value.
 */
const mean: {
    (arr: NumberArray): number;
    (arr: ObjectArray, key: string): number;
} = (arr: NumberArray | ObjectArray, key?: string): number => {
    const nums = extractNumbers(arr, key); 
    if (nums.length === 0) return 0;
    return toFixedNumber(nums.reduce((a, b) => a + b, 0) / nums.length);
};

// Hoare's selection algorithm (aka quickselect)
const quickselect = (arr: number[], k: number, left: number = 0, right: number = arr.length - 1): number => {
    const swap = (i: number, j: number): void => {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };

    while (left <= right) {
        const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
        const pivotValue = arr[pivotIndex];
        swap(pivotIndex, right);
        let storeIndex = left;
        for (let i = left; i < right; i++) {
            if (arr[i] < pivotValue) {
                swap(storeIndex, i);
                storeIndex++;
            }
        }
        swap(right, storeIndex);
        
        if (k === storeIndex) {
            return arr[k];
        } else if (k < storeIndex) {
            right = storeIndex - 1;
        } else {
            left = storeIndex + 1;
        }
    }
    return arr[left];
};

const THRESHOLD = 32;

/**
 * Calculates the median of a set of numbers.
 * @param arr The array of objects or numbers.
 * @param key The key to extract values from if `arr` is an array of objects.
 * @returns The median value.
 */
const median: {
    (arr: NumberArray): number;
    (arr: ObjectArray, key: string): number;
} = (arr: NumberArray | ObjectArray, key?: string): number => {
    const nums = extractNumbers(arr, key); 
    if (nums.length === 0) return 0;

    // For small arrays, sorting is faster.
    if (nums.length < THRESHOLD) {
        const sorted = [...nums].sort((a, b) => a - b);
        return medianOf(sorted);
    }

    const mid = Math.floor(nums.length / 2);
    if (nums.length % 2 !== 0) {
        return quickselect([...nums], mid);
    } else {
        // A single copy is made and mutated by quickselect.
        const copy = [...nums]; 
        const m1 = quickselect(copy, mid - 1);
        const m2 = quickselect(copy, mid, mid); // The left part of the array is already partitioned
        return toFixedNumber((m1 + m2) / 2);
    }
};

/**
 * Calculates the mode(s) of a set of numbers.
 * Returns an array of all values that appear with the highest frequency.
 * If all values appear exactly once, returns all values.
 * @param arr The array of objects or numbers.
 * @param key The key to extract values from if `arr` is an array of objects.
 * @returns An array of the mode(s).
 */
const mode: {
    (arr: NumberArray): number[];
    (arr: ObjectArray, key: string): number[];
} = (arr: NumberArray | ObjectArray, key?: string): number[] => {
    const nums = extractNumbers(arr, key); 
    if (nums.length === 0) return [];
    
    const freq = new Map<number, number>();
    let maxFreq = 0;

    for (const n of nums) {
        const currentCount = (freq.get(n) || 0) + 1;
        freq.set(n, currentCount);
        if (currentCount > maxFreq) {
            maxFreq = currentCount;
        }
    }

    const res: number[] = [];
    for (const [num, count] of freq.entries()) {
        if (count === maxFreq) {
            res.push(num);
        }
    }
    return res.sort((a, b) => a - b); // Return sorted for consistency
};

/**
 * Calculates the range of a set of numbers.
 * @param arr The array of objects or numbers.
 * @param key The key to extract values from if `arr` is an array of objects.
 * @returns The range value.
 */
const range: {
    (arr: NumberArray): number;
    (arr: ObjectArray, key: string): number;
} = (arr: NumberArray | ObjectArray, key?: string): number => {
    const nums = extractNumbers(arr, key); 
    if (nums.length === 0) return 0;

    let min = nums[0];
    let max = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < min) {
            min = nums[i];
        } else if (nums[i] > max) {
            max = nums[i];
        }
    }
    return max - min;
};

/**
 * Calculates the variance of a set of numbers.
 * @param arr The array of objects or numbers.
 * @param options Configuration options.
 * @returns The variance value.
 * @throws {RangeError} If the array has insufficient data for the calculation.
 */
const variance: {
    (arr: NumberArray, options?: Omit<VarianceOptions, 'key'>): number;
    (arr: ObjectArray, options: VarianceOptions & { key: string }): number;
} = (arr: NumberArray | ObjectArray, options: VarianceOptions = {}): number => {
    const { key, isSample = true } = options;
    
    const nums = extractNumbers(arr, key);
    if (nums.length === 0) return 0;
    
    const divisor = isSample ? nums.length - 1 : nums.length;
    
    if (divisor <= 0) {
        throw new RangeError("Sample variance requires at least 2 data points.");
    }

    const meanValue = nums.reduce((a, b) => a + b, 0) / nums.length;
    const sumOfSquares = nums.reduce((sum, num) => sum + Math.pow(num - meanValue, 2), 0);
    return toFixedNumber(sumOfSquares / divisor);
};

/**
 * Calculates the standard deviation of a set of numbers.
 * @param arr The array of objects or numbers.
 * @param options Configuration options.
 * @returns The standard deviation value.
 * @throws {RangeError} If the array has insufficient data for the calculation.
 */
const stdev: {
    (arr: NumberArray, options?: Omit<VarianceOptions, 'key'>): number;
    (arr: ObjectArray, options: VarianceOptions & { key: string }): number;
} = (arr: NumberArray | ObjectArray, options: VarianceOptions = {}): number => {
    const { key, isSample = true } = options;
    
    const nums = extractNumbers(arr, key);
    if (nums.length === 0) return 0;
    
    const divisor = isSample ? nums.length - 1 : nums.length;
    
    if (divisor <= 0) {
        throw new RangeError("Sample variance requires at least 2 data points.");
    }

    const meanValue = nums.reduce((a, b) => a + b, 0) / nums.length;
    const sumOfSquares = nums.reduce((sum, num) => sum + Math.pow(num - meanValue, 2), 0);
    const varianceValue = toFixedNumber(sumOfSquares / divisor);
    
    return toFixedNumber(Math.sqrt(varianceValue));
};

/**
 * Calculates the nth percentile of a set of numbers.
 * @param arr The array of objects or numbers.
 * @param p The percentile to calculate (0-100).
 * @param key The key to extract values from if `arr` is an array of objects.
 * @returns The value at the nth percentile.
 * @throws {RangeError} If percentile is out of valid range.
 */
const percentile: {
    (arr: NumberArray, p: number): number;
    (arr: ObjectArray, p: number, key: string): number;
} = (arr: NumberArray | ObjectArray, p: number, key?: string): number => {
    if (p < 0 || p > 100) {
        throw new RangeError("Percentile must be between 0 and 100.");
    }
    
    const nums = extractNumbers(arr, key);
    if (nums.length === 0) return 0; 
    
    // Use Math.min/max for edge cases to avoid floating point issues with quickselect
    if (p === 0) return Math.min(...nums);
    if (p === 100) return Math.max(...nums);

    const sorted = [...nums].sort((a, b) => a - b);
    const index = (p / 100) * (sorted.length - 1);
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);

    if (lowerIndex === upperIndex) {
        return sorted[lowerIndex];
    }

    const lowerValue = sorted[lowerIndex];
    const upperValue = sorted[upperIndex];
    const weight = index - lowerIndex;
    return toFixedNumber(lowerValue * (1 - weight) + upperValue * weight);
};

const statistics = {
    mean,
    median,
    mode,
    range,
    variance,
    stdev,
    percentile,
};

export default statistics;

/**
 * USAGE:
 *
 * @namespace statistics
 *
 * @example
 * // How to import
 * import statistics from './mintstats.js'; // After compilation, this will be correct
 *
 * // Usage with an array of numbers
 * const numbers = [10, 20, 20, 30, 50];
 *
 * console.log(statistics.mean(numbers));   // Output: 26
 * console.log(statistics.median(numbers)); // Output: 20
 * console.log(statistics.mode(numbers));   // Output: [20]
 * console.log(statistics.range(numbers));  // Output: 40
 *
 * @example
 * // Usage with an array of objects
 * const students = [
 *   { name: "A", score: 85 },
 *   { name: "B", score: 92 },
 *   { name: "C", score: 78 },
 *   { name: "D", score: 92 },
 * ];
 *
 * console.log(statistics.mean(students, 'score'));   // Output: 86.75
 * console.log(statistics.median(students, 'score')); // Output: 88.5
 * console.log(statistics.mode(students, 'score'));   // Output: [92]
 * console.log(statistics.variance(students, { key: 'score', isSample: true })); // Sample variance
 * console.log(statistics.percentile(students, 75, 'score')); // 75th percentile
 */