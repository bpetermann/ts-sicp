/* eslint-disable @typescript-eslint/no-explicit-any */
import { square, abs, average, math_floor, math_log2 } from '../../../utils'

type UnaryFunction = (x: number) => number

const tolerance = 0.00001
function fixed_point(f: UnaryFunction, first_guess: number): number {
  function close_enough(x: number, y: number): boolean {
    return abs(x - y) < tolerance
  }
  function try_with(guess: number): number {
    const next = f(guess)
    return close_enough(guess, next) ? next : try_with(next)
  }
  return try_with(first_guess)
}

function average_damp(f: UnaryFunction): UnaryFunction {
  return (x) => average(x, f(x))
}

function compose<T extends (n: number) => number>(f: T, g: T): (x: number) => ReturnType<T> {
  return (x: number) => f(g(x)) as ReturnType<T>
}

function repeated<T extends (n: any) => any>(
  f: T,
  n: number
): ((x: number | UnaryFunction) => any) | ((x: any) => ReturnType<T>) {
  return n === 0 ? (x: number | UnaryFunction) => x : compose(f, repeated(f, n - 1))
}

function is_even(n: number): boolean {
  return n % 2 === 0
}

function fast_expt(b: number, n: number): number {
  return n === 0 ? 1 : is_even(n) ? square(fast_expt(b, n / 2)) : b * fast_expt(b, n - 1)
}

function nth_root(n: number, x: number): number {
  return fixed_point(
    repeated(average_damp, math_floor(math_log2(n)))((y) => x / fast_expt(y, n - 1)),
    1
  )
}

test('1.45', () => {
  expect(nth_root(5, 32)).toBeCloseTo(2)
})
