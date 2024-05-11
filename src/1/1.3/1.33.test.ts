import { is_prime, square } from '../../../utils'

function filtered_accumulate(
  combiner: (a: number, b: number) => number,
  null_value: 1 | 0,
  term: (n: number) => number,
  a: number,
  next: (n: number) => number,
  b: number,
  filter: (n: number) => boolean
): number {
  return a > b
    ? null_value
    : filter(a)
      ? combiner(term(a), filtered_accumulate(combiner, null_value, term, next(a), next, b, filter))
      : filtered_accumulate(combiner, null_value, term, next(a), next, b, filter)
}

function prime_squares_sum(a: number, b: number): number {
  function inc(n: number): number {
    return n + 1
  }
  function plus(x: number, y: number): number {
    return x + y
  }
  return filtered_accumulate(plus, 0, square, a, inc, b, is_prime)
}

test('1.33', () => {
  expect(prime_squares_sum(4, 10)).toEqual(74)
})
