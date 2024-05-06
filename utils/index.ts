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
export function cubed(x: number): number {
  return x * x * x
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
  Returns a pseudorandom number between 0 and 1.
 */
export function math_random(): number {
  return Math.random()
}
