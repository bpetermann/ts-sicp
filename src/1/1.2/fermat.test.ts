import { is_even, square, math_random, math_floor } from '../../../utils'

function expmod(base: number, exp: number, m: number): number {
  return exp === 0 ? 1 : is_even(exp) ? square(expmod(base, exp / 2, m)) % m : (base * expmod(base, exp - 1, m)) % m
}

function random(n: number): number {
  return math_floor(math_random() * n)
}

function fermat_test(n: number): boolean {
  function try_it(a: number): boolean {
    return expmod(a, n, n) === a
  }
  return try_it(1 + random(n - 1))
}

function fast_is_prime(n: number, times: number): boolean {
  return times === 0 ? true : fermat_test(n) ? fast_is_prime(n, times - 1) : false
}

test('fermats test', () => {
  expect(fast_is_prime(97, 3)).toBe(true)
})
