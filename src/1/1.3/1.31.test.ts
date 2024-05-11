function linear_product(term: (n: number) => number, a: number, next: (n: number) => number, b: number): number {
  return a > b ? 1 : term(a) * linear_product(term, next(a), next, b)
}

function iterative_product(term: (n: number) => number, a: number, next: (n: number) => number, b: number): number {
  function iter(a: number, result: number): number {
    return a > b ? result : iter(next(a), result * term(a))
  }
  return iter(a, 1)
}

function factorial(i: number): number {
  return linear_product(
    (x) => x,
    1,
    (x) => x + 1,
    i
  )
}

function pi_sum(n: number): number {
  function is_odd(i: number): boolean {
    return i % 2 === 1
  }

  function term(i: number): number {
    return is_odd(i) ? (i + 1) / (i + 2) : (i + 2) / (i + 1)
  }

  function next(i: number): number {
    return i + 1
  }

  return 4 * linear_product(term, 1.0, next, n)
}

test('1.30', () => {
  expect(factorial(6)).toEqual(720)
  expect(factorial(12)).toEqual(479001600)
  expect(pi_sum(20)).toEqual(3.2137849402931886)
  expect(
    iterative_product(
      (x) => x,
      1,
      (x) => x + 1,
      5
    )
  ).toEqual(factorial(5))
})
