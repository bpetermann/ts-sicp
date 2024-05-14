type Pair = (m: (p: number, q: number) => number) => number

function pair(x: number, y: number): Pair {
  return (m) => m(x, y)
}

function head(z: Pair): number {
  return z((p) => p)
}

function tail(z: Pair): number {
  return z((_, q) => q)
}

test('2.4', () => {
  const x = pair(1, 2)
  expect(head(x)).toBe(1)
  expect(tail(x)).toBe(2)
})
