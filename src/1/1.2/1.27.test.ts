import { is_even, square } from '../../../utils'

test('Demonstrate that the Carmichael numbers really do fool the Fermat test.', () => {
  function expmod(base: number, exp: number, m: number): number {
    return exp === 0 ? 1 : is_even(exp) ? square(expmod(base, exp / 2, m)) % m : (base * expmod(base, exp - 1, m)) % m
  }

  function fermat_test(n: number, x: number): boolean {
    function try_it(a: number): boolean {
      return expmod(a, n, n) === a
    }
    return try_it(x)
  }

  function fast_is_prime(n: number, times: number): boolean {
    return times === 0 ? true : fermat_test(n, times) ? fast_is_prime(n, times - 1) : false
  }

  expect(fast_is_prime(561, 560)).toBe(true)
  expect(fast_is_prime(1105, 1104)).toBe(true)
  expect(fast_is_prime(1729, 1728)).toBe(true)
  expect(fast_is_prime(2465, 2464)).toBe(true)
  expect(fast_is_prime(2821, 2820)).toBe(true)
  expect(fast_is_prime(6601, 6600)).toBe(true)
})
