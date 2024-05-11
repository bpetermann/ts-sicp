/* eslint-disable @typescript-eslint/no-unused-vars */
function cont_frac(n: (n: number) => number, d: (n: number) => number, k: number): number {
  function fraction(i: number): number {
    return i > k ? 0 : n(i) / (d(i) + fraction(i + 1))
  }
  return fraction(1)
}

test('1.37', () => {
  function d(n: number): number {
    return (n + 1) % 3 < 1 ? (2 * (n + 1)) / 3 : 1
  }

  expect(2 + cont_frac((_) => 1, d, 20)).toBeCloseTo(2.71828)
})
