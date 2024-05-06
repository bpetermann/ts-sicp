import { is_even } from '../../../utils'

function fib(n: number): number {
  return fib_iter(1, 0, 0, 1, n)
}
function fib_iter(a: number, b: number, p: number, q: number, count: number): number {
  return count === 0
    ? b
    : is_even(count)
      ? fib_iter(a, b, p * p + q * q, 2 * p * q + q * q, count / 2)
      : fib_iter(b * q + a * q + a * p, b * p + a * q, p, q, count - 1)
}

test('1.19', () => {
  expect(fib(5)).toEqual(5)
})
