import { cube, square } from '../../../utils'

function abs(x: number): number {
  return x >= 0 ? x : -x
}

const tolerance = 0.00001
function fixed_point(f: (n: number) => number, first_guess: number): number {
  function close_enough(x: number, y: number): boolean {
    return abs(x - y) < tolerance
  }
  function try_with(guess: number): number {
    const next = f(guess)
    return close_enough(guess, next) ? next : try_with(next)
  }
  return try_with(first_guess)
}

const dx = 0.00001

function deriv(g: (n: number) => number): (n: number) => number {
  return (x) => (g(x + dx) - g(x)) / dx
}

function newton_transform(g: (n: number) => number): (n: number) => number {
  return (x) => x - g(x) / deriv(g)(x)
}
function newtons_method(g: (n: number) => number, guess: number): number {
  return fixed_point(newton_transform(g), guess)
}

function cubic(a: number, b: number, c: number): (n: number) => number {
  return (x) => cube(x) + a * square(x) + b * x + c
}

test('1.40', () => {
  expect(newtons_method(cubic(1, -4, 0), 1)).toBeCloseTo(1.56155)
})
