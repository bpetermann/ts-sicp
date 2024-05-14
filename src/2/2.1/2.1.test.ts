import { pair } from 'sicp'
import { abs } from '../../../utils'

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

function sign(x: number): number {
  return x < 0 ? -1 : x > 0 ? 1 : 0
}

function make_rat(n: number, d: number): [number, number] {
  const g = gcd(n, d)
  return pair(sign(n) * sign(d) * abs(n / g), abs(d / g))
}

test('2.1', () => {
  expect(make_rat(3, -4)).toEqual([-3, 4])
  expect(make_rat(-3, -4)).toEqual([3, 4])
})
