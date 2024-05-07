import { display } from 'sicp'
import { get_time, math_floor, math_log, math_random, square } from '../../../utils'

function is_even(n: number): boolean {
  return n % 2 === 0
}

function expmod(base: number, exp: number, m: number): number {
  return exp === 0 ? 1 : is_even(exp) ? square(expmod(base, exp / 2, m)) % m : (base * expmod(base, exp - 1, m)) % m
}

function fermat_test(n: number): boolean {
  function try_it(a: number) {
    return expmod(a, n, n) === a
  }
  return try_it(1 + math_floor(math_random() * (n - 1)))
}

function fast_is_prime(n: number, times: number): void | boolean {
  return times === 0 ? true : fermat_test(n) ? fast_is_prime(n, times - 1) : false
}

export function timed_prime_test(n: number): void | boolean {
  display(n)
  return start_prime_test(n, get_time())
}

function start_prime_test(n: number, start_time: number): void | boolean {
  return fast_is_prime(n, math_floor(math_log(n))) ? report_prime(get_time() - start_time) : true
}
function report_prime(elapsed_time: number): void {
  display(' *** ')
  display(elapsed_time)
}

test('1.24', () => {})
