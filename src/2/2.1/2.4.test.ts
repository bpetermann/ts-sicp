test('2.4', () => {
  function pair(x: number, y: number): (m: (p: number, q: number) => number) => number {
    return (m) => m(x, y)
  }

  function head(z: (m: (p: number, q: number) => number) => number): number {
    return z((p) => p)
  }

  function tail(z: (m: (p: number, q: number) => number) => number): number {
    return z((_, q) => q)
  }

  const x = pair(1, 2)
  expect(head(x)).toBe(1)
  expect(tail(x)).toBe(2)
})
