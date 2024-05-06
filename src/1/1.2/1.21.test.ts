import { square } from '../../../utils'

function smallest_divisor(n: number): number {
  return find_divisor(n, 2)
}
function find_divisor(n: number, test_divisor: number): number {
  return square(test_divisor) > n ? n : divides(test_divisor, n) ? test_divisor : find_divisor(n, test_divisor + 1)
}

function divides(a: number, b: number): boolean {
  return b % a === 0
}

test('1.19', () => {
  const expected = [199, 1999, 7]

  ;[199, 1999, 19999].forEach((n, i) => expect(smallest_divisor(n)).toBe(expected[i]))
})
