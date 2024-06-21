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
   *  Computes the square root of x.
   * @param {number} x the given number
   * @return {number} the square root of x
   */
  export function math_sqrt(x: number): number

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
   * Computes the sine of x. The argument is expressed in radians.
   * @param {number} x - the given number
   * @returns the sine of x
   */
  export function math_sin(x: number): number

  /**
   * Computes the cosine of x. The argument is expressed in radians.
   * @param {number} x - given number
   * @returns - cosine of x
   */
  export function math_cos(x: number): number

  /**
   * computes the arc tangent of x. The result is expressed
   * in radians and ranges from -π / 2 to +π / 2.
   * @param {number} x - given number
   * @returns arc tangent of x
   */
  export function math_atan(x: number): number

  /**
   * computes the arc tangent of the quotient y / x of the arguments y and x,
   * where the signs of y and x are used to determine the quadrant of the result.
   * Note that it is intentional and traditional for the two-argument arc tangent
   * function that the argument named y be first and the argument named x be second.
   * The result is expressed in radians and ranges from -π to +π.
   * @param {number} y - given first number
   * @param {number} x - given second number
   */
  export function math_atan2(y: number, x: number): number

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
   * Returns head (first component) of iven value p.
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

  type NestedPairs<T extends unknown[]> = T extends [infer U, ...infer Rest] ? [U, NestedPairs<Rest>] : null
  export function list<T extends unknown[]>(...args: T): NestedPairs<T>

  /**
   * **primitive**; returns true if x is the empty list null,
   * and false otherwise;
   *
   * Time: Theta(1) Theta(1)
   *
   * @param {unknown[]} x value given value
   * @return {boolean}  whether x is null
   */
  export function is_null<T extends unknown[]>(...x: T): boolean

  /**
   * Returns the length of the list xs.
   * Iterative process;
   *
   * Time: Theta(1) Theta(1)
   *
   * @param {unknown[]} xs given list
   * @return {boolean}  length of xs
   */
  export function length<T extends unknown[]>(...xs: T): number

  /**
   * Returns a list that results from appending the list ys to the list xs.
   * Iterative process; time: Theta(n), space: Theta(n),
   * where n is the length of xs. In the result,
   * null at the end of the first argument list is replaced by the second argument,
   * regardless what the second argument consists of.
   *
   *
   * @param {unknown[]} xs list given first list
   * @param {unknown[]} ys list given second list
   * @return {unknown[]}
   */
  export function append<T extends unknown[], U extends unknown[]>(xs: T, ys: U): [T, U]

  /**
   * Returns a list that results from list xs by element-wise application of unary function f.
   * Iterative process; time: Theta(n) (apart from f), space: Theta(n) (apart from f),
   * where n is the length of xs.
   * f is applied element-by-element: map(f, list(1, 2)) results in list(f(1), f(2)).
   *
   * @param {function} f function unary
   * @param {unknown[]} xs list	given list
   *
   */
  export function map<T, U extends [T, U | [T, null] | null]>(f: (x: T) => T, xs: U): U

  /**
   * **primitive**; returns true if x is a pair and false otherwise; time: Theta(1)Theta(1).
   * @param {unknown} x - given value
   * @return {boolean} whether x is a pair
   *
   */
  export function is_pair(x: unknown): boolean

  /**
   * checks whether a given value is a number. See also textbook example.
   * @param {unknown} v - value	to be checked
   * @return {boolean} indicating whether the value is a number
   *
   */
  export function is_number(v: unknown): v is number

  /**
   * checks whether a given value is a string. See also textbook example.
   * @param {unknwon} v - value to be checked
   * @return {boolean} indicating whether the value is a string
   */
  export function is_string(v: unknown): v is string

  /**
   * Optional second argument. If present, displays the given string s,
   * followed by a space character, followed by the value v in the console
   * with error flag. If second argument not present, just displays the value v
   * in the console with error flag. The evaluation of any call of error
   * aborts the running program immediately. The notation used for the display
   * of values is consistent with JSON, but also displays
   * undefined, NaN, Infinity, and function objects.
   * @param {unknwon} v - value to be displayed
   * @param {string} s - string to be displayed, preceding v
   */
  export function error(v: unknown, s?: string): void

  /**
   *  calls the function f with arguments given in list xs.
   *
   * For example:
   *
   * function times(x, y) {
   *  return x * y;
   * }
   *
   * apply_in_underlying_javascript(times, list(2, 3));
   *
   * returns 6
   *
   *  @param {Function} f - function to be applied
   *  @param {Array} xs - arguments given in list
   */
  export function apply_in_underlying_javascript<T>(f: (x: T, y?: T | T) => T, xs: T): T

  /**
   * checks whether a given value is the special value undefined
   *  @param {unknown} v - value to be checked
   */
  export function is_undefined(v: unknown): v is undefined

  /**
   * changes the pair p such that its tail is x.
   *  @param {unknown[]} p - given pair
   *  @param {unknown} v - given value
   */

  export function set_tail(p: unknown[], v: unknown): undefined

  /**
   * Returns true if both have the same structure with respect to pair,
   * and identical values at corresponding leave positions (places that are not themselves pairs),
   * and false otherwise. For the "identical", the values need to have the same type, otherwise
   * the result is false. If corresponding leaves are boolean values, these values need to be the same.
   * If both are undefined or both are null, the result is true.
   * Otherwise they are compared with === (using the definition of === in the respective Source language in use).
   *
   *  @param {unknown} x - given value
   *  @param {unknown} y - given value
   */

  export function equal(x: unknown, y: unknown): boolean
}
