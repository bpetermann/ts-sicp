import { abs } from '../../../utils'

const tolerance = 0.00001

function fixed_point(f: (x: number) => number, first_guess: number): number {
  function close_enough(x: number, y: number): boolean {
    return abs(x - y) < tolerance
  }
  function try_with(guess: number): number {
    const next = f(guess)
    return close_enough(guess, next) ? next : try_with(next)
  }
  return try_with(first_guess)
}

test('1.35', () => {
  function golden_ratio(): number {
    return fixed_point((x) => 1 + 1 / x, 1)
  }

  expect(golden_ratio()).toBeCloseTo(1.6180339887)
})
