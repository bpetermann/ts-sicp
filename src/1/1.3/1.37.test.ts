import { ϕ } from '../../../utils'

/* eslint-disable @typescript-eslint/no-unused-vars */
function cont_frac(n: (n: number) => number, d: (n: number) => number, k: number): number {
  function fraction(i: number): number {
    return i > k ? 0 : n(i) / (d(i) + fraction(i + 1))
  }
  return fraction(1)
}

test('1.37', () => {
  expect(
    cont_frac(
      (_) => 1,
      (_) => 1,
      20
    )
  ).toBeCloseTo(1 / ϕ)
})
