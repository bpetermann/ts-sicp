function linear_sum(term: (x: number) => number, a: number, next: (x: number) => number, b: number): number {
  return a > b ? 0 : term(a) + linear_sum(term, next(a), next, b)
}

function iterative_sum(term: (x: number) => number, a: number, next: (x: number) => number, b: number): number {
  function iter(a: number, result: number): number {
    return a > b ? result : iter(next(a), result + term(a))
  }
  return iter(a, 0)
}

test('1.30', () => {
  expect(
    linear_sum(
      (x) => x,
      1,
      (x) => x + 1,
      10
    )
  ).toEqual(55)
  expect(
    iterative_sum(
      (x) => x,
      1,
      (x) => x + 1,
      10
    )
  ).toEqual(55)
})
