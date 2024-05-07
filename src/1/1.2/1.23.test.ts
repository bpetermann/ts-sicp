import { square } from '../../../utils'

function smallest_divisor(n: number): number {
  return find_divisor(n, 2)
}

function find_divisor(n: number, test_divisor: number): number {
  return square(test_divisor) > n ? n : divides(test_divisor, n) ? test_divisor : find_divisor(n, next(test_divisor))
}

function divides(a: number, b: number): boolean {
  return b % a === 0
}

function next(input: number): number {
  return input === 2 ? 3 : input + 2
}

test('1.23', () => {
  expect(smallest_divisor(42)).toEqual(2)
})
