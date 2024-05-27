describe('1.11', () => {
  // recursive
  function f(n: number): number {
    return n < 3 ? n : f(n - 1) + 2 * f(n - 2) + 3 * f(n - 3)
  }

  // iterative
  function f2(n: number) {
    return f2_iter(0, 1, 2, n)
  }

  function f2_iter(a: number, b: number, c: number, n: number): number {
    return n === 0 ? a : f2_iter(b, c, c + 2 * b + 3 * a, n - 1)
  }
  test('Recursive and iterative process should produce the same result', () => {
    Array.from({ length: 10 }, (_, i) => i + 1).forEach((i) => {
      expect(f(i)).toEqual(f2(i))
    })
  })
})
