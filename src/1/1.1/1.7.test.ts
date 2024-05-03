import { square } from '../../../utils'

function abs(x: number): number {
  return Math.abs(x)
}

function is_good_enough(guess: number, x: number): boolean {
  return abs(square(guess) - x) < 0.001
}

function average(x: number, y: number): number {
  return (x + y) / 2
}

function improve(guess: number, x: number): number {
  return average(guess, x / guess)
}

function sqrt_iter(guess: number, x: number): number {
  return is_good_enough(guess, x) ? guess : sqrt_iter(improve(guess, x), x)
}

function sqrt(x: number): number {
  return sqrt_iter(1, x)
}

describe('1.7', () => {
  test('Sum of largest two squared', () => {
    expect(sqrt(9)).toEqual(3.00009155413138)
  })
})
