function accumulate(
  combiner: (a: number, b: number) => number,
  null_value: 1 | 0,
  term: (n: number) => number,
  a: number,
  next: (n: number) => number,
  b: number
): number {
  return a > b ? null_value : combiner(term(a), accumulate(combiner, null_value, term, next(a), next, b))
}

describe('1.32', () => {
  test('accumulate factorial', () => {
    function factorial(i: number): number {
      function term(x: number): number {
        return x
      }

      function next(x: number): number {
        return x + 1
      }

      function multiply(x: number, y: number): number {
        return x * y
      }

      return accumulate(multiply, 1, term, 1, next, i)
    }

    expect(factorial(6)).toEqual(720)
  })

  test('accumulate sum', () => {
    function sum(a: number, b: number): number {
      function term(x: number): number {
        return x
      }

      function next(x: number): number {
        return x + 1
      }

      function plus(x: number, y: number): number {
        return x + y
      }
      return accumulate(plus, 0, term, a, next, b)
    }

    expect(sum(1, 10)).toEqual(55)
  })
})
