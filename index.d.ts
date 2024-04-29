declare module 'sicp' {
  /**
   * Displays the value v in the console.
   * @param {any} v Value to be displayed.
   * @param {string} [s] String to be displayed.
   *    Optional second argument.
   *    If present, displays the given string s,
   *    followed by a space character,
   *    followed by the value v in the console.
   *    If second argument not present,
   *    just displays the value v in the console.
   */
  export function display(v: unknown, s?: string): void
}
