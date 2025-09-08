/**
 * USAGE:
 * @example import statistics from './mintstats.js';
 */

declare namespace statistics {
    /**
     * @param arr The array of objects or numbers.
     * @param key The key to extract values from if `arr` is an array of objects.
     * @returns The mean value.
     * @throws {TypeError} If the input is not an array or contains non-numeric values.
     */

    export function mean<T extends object>(arr: T[], key: keyof T): number;
    export function mean(arr: number[]): number;

    /**
     * @param arr The array of objects or numbers.
     * @param key The key to extract values from if `arr` is an array of objects.
     * @returns The median value.
     * @throws {TypeError} If the input is not an array or contains non-numeric values.
     */

    export function median<T extends object>(arr: T[], key: keyof T): number;
    export function median(arr: number[]): number;

    /**
     * @param arr The array of objects or numbers.
     * @param key The key to extract values from if `arr` is an array of objects.
     * @returns An array of the mode(s).
     * A dataset can have more than one mode, so this function always returns an array.
     * @throws {TypeError} If the input is not an array or contains non-numeric values.
     */

    export function mode<T extends object>(arr: T[], key: keyof T): number[];
    export function mode(arr: number[]): number[];

    /**
     * @param arr The array of objects or numbers.
     * @param key The key to extract values from if `arr` is an array of objects.
     * @returns The range value.
     * @throws {TypeError} If the input is not an array or contains non-numeric values.
     */

    export function range<T extends object>(arr: T[], key: keyof T): number;
    export function range(arr: number[]): number;

    /**
     * @param arr The array of objects or numbers.
     * @param keyOrIsSample The key for objects, or a boolean to specify sample/population.
     * @param isSample If true (default), calculates sample variance (n-1), otherwise population variance (n).
     * @returns The variance value.
     * @throws {TypeError} If the input is not an array or contains non-numeric values.
     * @throws {RangeError} If the array has insufficient data for the calculation.
     */

    export function variance<T extends object>(arr: T[], key: keyof T, isSample?: boolean): number; // (arr, key, isSample)
    export function variance(arr: number[], isSample?: boolean): number; // (arr, isSample)

    /**
     * @param arr The array of objects or numbers.
     * @param keyOrIsSample The key for objects, or a boolean to specify sample/population.
     * @param isSample If true (default), calculates sample standard deviation (n-1), otherwise population stdev (n).
     * @returns The standard deviation value.
     * @throws {TypeError} If the input is not an array or contains non-numeric values.
     * @throws {RangeError} If the array has insufficient data for the calculation.
     */

    export function stdev<T extends object>(arr: T[], key: keyof T, isSample?: boolean): number; // (arr, key, isSample)
    export function stdev(arr: number[], isSample?: boolean): number; // (arr, isSample)

    /**
     * This can be used to find quartiles (e.g., Q1 = percentile(arr, 25)).
     * @param arr The array of objects or numbers.
     * @param p The percentile to calculate (a number between 0 and 100).
     * @param key The key to extract values from if `arr` is an array of objects.
     * @returns The value at the nth percentile.
     * @throws {TypeError} If the input is not an array or contains non-numeric values.
     */

    export function percentile<T extends object>(arr: T[], p: number, key: keyof T): number;
    export function percentile(arr: number[], p: number): number;
}

export default statistics;