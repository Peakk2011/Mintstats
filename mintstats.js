/**
 * Calculates the median of a pre-sorted array of numbers.
 * @param {number[]} arr The sorted array of numbers.
 * @returns {number} The median of the numbers.
 */

const medianOf = arr => {
    const mid = Math.floor(arr.length / 2);
    return arr.length % 2 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
};

/**
 * @param {string} [key] The key to extract values from if `arr` is an array of objects.
 * @returns {number[]} An array of numbers.
 * @throws {TypeError} If the input is not an array.
 * @throws {TypeError} If an extracted value is not a number, null, or undefined.
 */

const extractNumbers = (arr, key) => {
    if (!Array.isArray(arr)) {
        throw new TypeError("Input must be an array.");
    }
    const mapped = key ? arr.map(obj => obj[key]) : arr;
    const numbers = [];
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
 * @param {number} value The number to round.
 * @param {number} precision The number of decimal places.
 * @returns {number} The rounded number.
 */
const toFixedNumber = (value, precision = 10) => {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
};

/**
 * @param {(object[]|number[])} arr The array of objects or numbers.
 * @param {string} [key] The key to extract values from if `arr` is an array of objects.
 * @returns {number} The mean value.
 */

const mean = (arr, key) => {
    const nums = extractNumbers(arr, key); 
    if (nums.length === 0) return 0;
    return toFixedNumber(nums.reduce((a, b) => a + b, 0) / nums.length);
};

/**
 * @param {(object[]|number[])} arr The array of objects or numbers.
 * @param {string} [key] The key to extract values from if `arr` is an array of objects.
 * @returns {number} The median value.
 */

const quickselect = (arr, k, left = 0, right = arr.length - 1) => {
    const swap = (i, j) => {[arr[i], arr[j]] = [arr[j], arr[i]];};

    while (left <= right) {
        const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
        let pivotValue = arr[pivotIndex];
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

const HYBRID_THRESHOLD = 32;

const median = (arr, key) => {
    const nums = extractNumbers(arr, key); 
    if (nums.length === 0) return 0;

    if (nums.length < HYBRID_THRESHOLD) {
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
        const m2 = quickselect(copy, mid, mid);
        return toFixedNumber((m1 + m2) / 2);
    }
};

/**
 * @param {(object[]|number[])} arr The array of objects or numbers.
 * @param {string} [key] The key to extract values from if `arr` is an array of objects.
 * @returns {number[]} An array of the mode(s).
 */

const mode = (arr, key) => {
    const nums = extractNumbers(arr, key); 
    if (nums.length === 0) return [];
    const freq = new Map();
    let maxFreq = 0;

    for (const n of nums) {
        const currentCount = (freq.get(n) || 0) + 1;
        freq.set(n, currentCount);
        if (currentCount > maxFreq) {
            maxFreq = currentCount;
        }
    }

    const res = [];
    for (const [num, count] of freq.entries()) {
        if (count === maxFreq) {
            res.push(num);
        }
    }
    return res;
};

/**
 * @param {(object[]|number[])} arr The array of objects or numbers.
 * @param {string} [key] The key to extract values from if `arr` is an array of objects.
 * @returns {number} The range value.
 */

const range = (arr, key) => {
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
 * @param {(object[]|number[])} arr The array of objects or numbers.
 * @param {string|boolean} [keyOrIsSample] The key for objects, or a boolean to specify sample/population.
 * @param {boolean} [isSample=true] If true, calculates sample variance (n-1), otherwise population variance (n).
 * @returns {number} The variance value.
 * @throws {RangeError} If the array has insufficient data for the calculation.
 */

const variance = (arr, keyOrIsSample, isSample = true) => {
    let key = null;
    let sample = isSample;

    if (typeof keyOrIsSample === 'string') {
        key = keyOrIsSample;
    } else if (typeof keyOrIsSample === 'boolean') {
        sample = keyOrIsSample;
    }

    const nums = extractNumbers(arr, key);
    const divisor = sample ? nums.length - 1 : nums.length;

    if (divisor <= 0) {
        if (nums.length === 0) return 0; 
        throw new RangeError("Sample variance requires at least 2 data points.");
    }

    const meanValue = nums.reduce((a, b) => a + b, 0) / nums.length;
    const sumOfSquares = nums.reduce((sum, num) => sum + Math.pow(num - meanValue, 2), 0);
    return toFixedNumber(sumOfSquares / divisor);
};

/**
 * @param {(object[]|number[])} arr The array of objects or numbers.
 * @param {string|boolean} [keyOrIsSample] The key for objects, or a boolean to specify sample/population.
 * @param {boolean} [isSample=true] If true, calculates sample stdev (n-1), otherwise population stdev (n).
 * @returns {number} The standard deviation value.
 * @throws {RangeError} If the array has insufficient data for the calculation.
 */

const stdev = (arr, keyOrIsSample, isSample = true) => {
    // This function re-uses the logic from variance, so we just call it.
    const varianceValue = variance(arr, keyOrIsSample, isSample);
    return toFixedNumber(Math.sqrt(varianceValue));
};

/**
 * Calculates the nth percentile of a set of numbers.
 * @param {(object[]|number[])} arr The array of objects or numbers.
 * @param {number} p The percentile to calculate (0-100).
 * @param {string} [key] The key to extract values from if `arr` is an array of objects.
 * @returns {number} The value at the nth percentile.
 */

const percentile = (arr, p, key) => {
    const nums = extractNumbers(arr, key);
    if (nums.length === 0 || p < 0 || p > 100) return 0; 
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
 * import statistics from './mintstats.js';
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
 */