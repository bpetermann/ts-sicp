import { divides, get_time, square } from '../../../utils'
import colors from 'colors'

function smallest_divisor(n: number): number {
  return find_divisor(n, 2)
}
function find_divisor(n: number, test_divisor: number): number {
  return square(test_divisor) > n ? n : divides(test_divisor, n) ? test_divisor : find_divisor(n, test_divisor + 1)
}

function is_prime(n: number): boolean {
  return n === smallest_divisor(n)
}

function timed_prime_test(n: number): void | boolean {
  return start_prime_test(n, get_time())
}

function start_prime_test(n: number, start_time: number): void | boolean {
  return is_prime(n) ? report_prime(get_time() - start_time, n) : true
}

function report_prime(elapsed_time: number, n: number): void {
  const prime = colors.green(n.toString())
  const time = colors.yellow(elapsed_time.toString())
  console.log(`prime: ${prime}, time: ${time}`)
}

export function search_for_primes(x: number): void {
  search_for_primes_iter(x, 3)
}

function search_for_primes_iter(x: number, n: number): void | boolean {
  return n === 0 ? true : timed_prime_test(x) ? search_for_primes_iter(x + 1, n) : search_for_primes_iter(x + 1, n - 1)
}

test('1.22', () => {
  //   search_for_primes(1000)
  //   search_for_primes(10000)
  //   search_for_primes(100000)
  //   search_for_primes(1000000)
})
