function double<T extends (n: number) => number>(f: T): (n: number) => number {
  return (x) => f(f(x))
}

function inc(x: number): number {
  return x + 1
}

test('1.41', () => {
  expect(double(inc)(2)).toEqual(4)
})
