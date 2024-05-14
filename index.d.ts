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
   * Makes a pair whose head (first component) is x
   * and whose tail (second component) is y.
   *
   * Time: Theta(1) Theta(1)
   *
   * @param {T} x Value for the head.
   * @param {T} y Value for the tail.
   * @returns {[T, T]} A pair with x as the head and y as the tail.
   */
  export function pair<T>(x: T, y: T): [T, T]

  /**
   * Returns head (first component) of given pair p.
   *
   * Time: Theta(1) Theta(1)
   *
   * @param {Pair<T>} p given pair
   * @returns {T} head of p
   */
  export function head<T>(p: [T, T]): T

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
   * Returns tail (second component) of given pair p.
   *
   * Time: Theta(1) Theta(1)
   *
   * @param {Pair<T>} p given pair
   * @returns {T} head of p
   */
  export function tail<T>(p: [T, T]): T
}
