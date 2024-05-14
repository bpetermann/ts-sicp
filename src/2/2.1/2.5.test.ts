import { is_even } from '../../../utils'

function fast_expt(b: number, n: number): number {
  return fast_expt_iter(b, n, 1)
}

function fast_expt_iter(b: number, n: number, a: number): number {
  return n === 0 ? a : is_even(n) ? fast_expt_iter(b * b, n / 2, a) : fast_expt_iter(b, n - 1, a * b)
}

function pair(a: number, b: number): number {
  return fast_expt(2, a) * fast_expt(3, b)
}

function head(p: number): number {
  return p % 2 === 0 ? head(p / 2) + 1 : 0
}

function tail(p: number): number {
  return p % 3 === 0 ? tail(p / 3) + 1 : 0
}

test('2.5', () => {
  expect(tail(pair(3, 4))).toEqual(4)
  expect(head(pair(3, 4))).toEqual(3)
})
