function is_even(n: number): boolean {
  return n % 2 === 0
}

function fast_expt(b: number, n: number): number {
  return fast_expt_iter(b, n, 1)
}

function fast_expt_iter(b: number, n: number, a: number): number {
  return n === 0 ? a : is_even(n) ? fast_expt_iter(b * b, n / 2, a) : fast_expt_iter(b, n - 1, a * b)
}

test('1.16', () => {
  expect(fast_expt(3, 4)).toEqual(81)
})
