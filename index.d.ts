declare module 'sicp' {
  /**
   * Displays the value in the console.
   *
   * @param {unknown} v The value to be displayed.
   * @param {string} [s] Optional message to be displayed.
   *    If present, displays the given message followed by a space character,
   *    followed by the value in the console.
   *    If not present, just displays the value in the console.
   * @returns {v} v, the first argument value .
   */
  export function display<T>(v: T, s?: string): T

  /**
   * Returns a string that represents the value v,
   * using a notation that is is consistent with JSON,
   * but also displays undefined, NaN, Infinity, and function objects.
   *
   * @param v the argument value
   * @returns a string representation of the input value
   */
  export function stringify(v: unknown): string

  /**
   * Given zero or more numbers, returns the largest of them.
   * If no arguments are given, the result is -∞.
   * If any value is NaN, the result is NaN.
   * The comparison of values to determine the largest value is done
   * using the Abstract Relational Comparison algorithm except that
   * +0 is considered to be larger than -0.
   *
   * @param {number[]} values given numbers
   * @returns {number}  largest of them
   *
   */
  export function math_max(...values: number[]): number

  /**
   * Given zero or more arguments, returns the smallest of them.
   * If no arguments are given, the result is +∞.
   * If any value is NaN, the result is NaN.
   * The comparison of values to determine the smallest value is done
   * using the Abstract Relational Comparison algorithm except that
   * +0 is considered to be larger than -0.
   *
   * @param {number[]} values given numbers
   * @returns {number}  largest of them
   *
   */
  export function math_min(...values: number[]): number

  /**
   * Makes a pair whose head (first component) is x
   * and whose tail (second component) is y.
   *
   * Time: Theta(1) Theta(1)
   *
   * @param {T} x Value for the head.
   * @param {U} y Value for the tail.
   * @returns {[T, U]} A pair with x as the head and y as the tail.
   */
  export function pair<T, U>(x: T, y: U): [T, U]

  /**
   * Returns head (first component) of given pair p.
   *
   * Time: Theta(1) Theta(1)
   *
   * @param {Pair<T, U>} p given pair
   * @returns {T} head of p
   */
  export function head<T, U>(p: [T, U]): T

  /**
   * Returns tail (second component) of given pair p.
   *
   * Time: Theta(1) Theta(1)
   *
   * @param {Pair<T, U>} p given pair
   * @returns {U} tail of p
   */
  export function tail<T, U>(p: [T, U]): U

  /**
   * **primitive**; given n values, returns a list of length n.
   * The elements of the list are the given values in the given order
   *
   * Time: Theta(1) Theta(1)
   *
   * @param {unknown[]} args - The given values.
   * @returns {NestedPairs<T>} A list containing all values in the given order.
   */
  type NestedPairs<T> = T extends [arg: infer U, ...rest: infer Rest] ? [U, NestedPairs<Rest>] : null
  export function list<T extends unknown[]>(...args: T): NestedPairs<T>

  /**
   * **primitive**; returns true if x is the empty list null,
   * and false otherwise;
   *
   * Time: Theta(1) Theta(1)
   *
   * @param {NestedPairs<T>} x 	value 	given value
   * @return {boolean}  whether x is null
   */
  export function is_null<T extends unknown[]>(...x: T): boolean

  /**
   * Returns the length of the list xs.
   * Iterative process;
   *
   * Time: Theta(1) Theta(1)
   *
   * @param {NestedPairs<T>} xs given list
   * @return {boolean}  length of xs
   */
  export function length<T extends unknown[]>(...xs: T): number
}
