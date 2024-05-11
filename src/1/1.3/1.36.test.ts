import { abs, math_log } from '../../../utils'

const tolerance = 0.00001

function fixed_point(f: (x: number) => number, first_guess: number, steps: number): number {
  function close_enough(x: number, y: number): boolean {
    return abs(x - y) < tolerance
  }
  function try_with(guess: number): number {
    steps += 1
    const next = f(guess)
    return close_enough(guess, next) ? steps : try_with(next)
  }
  return try_with(first_guess)
}

test('1.36', () => {
  expect(fixed_point((x) => math_log(1000) / math_log(x), 2, 0)).toEqual(34)
})
