test('1.39', () => {
  function cont_frac(n: (n: number) => number, d: (n: number) => number, k: number): number {
    function fraction(i: number, current: number): number {
      return i === 0 ? current : fraction(i - 1, n(i) / (d(i) + current))
    }
    return fraction(k, 0)
  }

  function tan_cf(x: number, k: number): number {
    return cont_frac(
      (i) => (i === 1 ? x : -x * x),
      (i) => 2 * i - 1,
      k
    )
  }
  expect(tan_cf(Math.PI, 14)).toEqual(-2.8271597168564594e-16)
})
