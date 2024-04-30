import { square, cubed, abs } from '../../../utils'

function cube_root(x: number): number {
  return cube_root_iter(1, x)
}

function cube_root_iter(guess: number, x: number): number {
  return is_good_enough(guess, x) ? guess : cube_root_iter(improve(guess, x), x)
}

function is_good_enough(guess: number, x: number): boolean {
  return abs(cubed(guess) - x) < 0.001
}

function improve(guess: number, x: number): number {
  return (x / square(guess) + 2 * guess) / 3
}

test('1.8', () => {
  expect(cube_root(5)).toBeCloseTo(1.71)
  expect(cube_root(12)).toBeCloseTo(2.289)
  expect(cube_root(15)).toBeCloseTo(2.466)
})
