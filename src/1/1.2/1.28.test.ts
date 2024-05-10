import { is_even, math_floor, math_random, square } from '../../../utils'

test('Miller-Rabin test.', () => {
  function random(n: number): number {
    return math_floor(math_random() * n)
  }

  function nontrivial_test(n: number, m: number): number {
    return n === 1 || n === m - 1 ? n : square(n) % m === 1 ? 0 : n
  }

  function expmod(base: number, exp: number, m: number): number {
    return exp === 0
      ? 1
      : is_even(exp)
        ? square(nontrivial_test(expmod(base, exp / 2, m), m)) % m
        : (base * expmod(base, exp - 1, m)) % m
  }

  function miller_rabin_test(n: number): boolean {
    function try_it(a: number): boolean {
      return expmod(a, n - 1, n) === 1
    }
    return try_it(1 + random(n - 1))
  }

  function do_miler_rabin_test(n: number, times: number): boolean {
    return times === 0 ? true : miller_rabin_test(n) ? do_miler_rabin_test(n, times - 1) : false
  }

  expect(do_miler_rabin_test(561, 560)).toBe(false)
  expect(do_miler_rabin_test(1105, 1104)).toBe(false)
  expect(do_miler_rabin_test(1729, 1728)).toBe(false)
  expect(do_miler_rabin_test(2465, 2464)).toBe(false)
  expect(do_miler_rabin_test(2821, 2820)).toBe(false)
  expect(do_miler_rabin_test(6601, 6600)).toBe(false)
})
