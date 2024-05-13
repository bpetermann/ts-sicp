export const ϕ = 1.61803398875

/**
  Return the square of a number
  @param x number to square
 */
export function square(x: number): number {
  return x * x
}

/**
    Returns the cube of a number
    @param x number to cube
   */
export function cube(x: number): number {
  return x * x * x
}

/**
    Returns the input incremented by one
    @param x number to increment
   */
export function inc(x: number): number {
  return x + 1
}

/**
    Returns the absolute value of a number (the value without regard to whether it is positive or negative). For example, the absolute value of -5 is the same as the absolute value of 5.
    @param x A numeric expression for which the absolute value is needed.
   */
export function abs(x: number): number {
  return Math.abs(x)
}

/**
    Checks if a number is even
    @param n number to check
   */
export function is_even(n: number): boolean {
  return n % 2 === 0
}

/**
    Double a number
    @param x number to double
   */
export function double(x: number): number {
  return x + x
}

/**
    Halves a number
    @param x number to halve
   */
export function halve(x: number): number {
  return x / 2
}

/**
    Returns the greatest integer less than or equal to its numeric argument.
    @param x — A numeric expression.
   */
export function math_floor(x: number): number {
  return Math.floor(x)
}

/**
 * @returns Returns a pseudorandom number between 0 and 1.
 */
export function math_random(): number {
  return Math.random()
}

export function divides(a: number, b: number): boolean {
  return b % a === 0
}

/**
 * @returns Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal Coordinated Time (UTC).
 */
export function get_time(): number {
  return Date.now()
}

/**
 * Returns the natural logarithm (base e) of a number.
 * @param x — A numeric expression.
 */

export function math_log(x: number): number {
  return Math.log(x)
}

/**
 * Checks if a given number is  prime number.
 * @param n — A numeric expression.
 */
export function is_prime(n: number): boolean {
  function find_divisor(n: number, test_divisor: number): number {
    return square(test_divisor) > n ? n : divides(test_divisor, n) ? test_divisor : find_divisor(n, test_divisor + 1)
  }

  function smallest_divisor(n: number): number {
    return find_divisor(n, 2)
  }
  return n === smallest_divisor(n)
}

export function average(x: number, y: number): number {
  return (x + y) / 2
}

export function math_cos(x: number): number {
  return Math.cos(x)
}
