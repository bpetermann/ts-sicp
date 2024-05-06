/**
  Return the square of a number
  @param x number to square
  @returns square of x
 */
export function square(x: number): number {
  return x * x
}

/**
  Returns the cube of a number
  @param x number to cube
  @returns cube of x
 */
export function cubed(x: number): number {
  return x * x * x
}

/**
  Returns the absolute value of a number
  @param x number to get the absolute value of
  @returns absolute value of x
 */
export function abs(x: number): number {
  return Math.abs(x)
}

/**
  Checks if a number is even
  @param n number to check
  @returns true if even, false if odd
 */
export function is_even(n: number): boolean {
  return n % 2 === 0
}

/**
  Double a number
  @param x number to double
  @returns doubled number
 */
export function double(x: number): number {
  return x + x
}

/**
  Halves a number
  @param x number to halve
  @returns halved number
 */
export function halve(x: number): number {
  return x / 2
}
