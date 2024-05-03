const called: number[] = []

function abs(x: number): number {
  return x >= 0 ? x : -x
}

function cube(x: number): number {
  return x * x * x
}

function p(x: number): number {
  called.push(x)
  return 3 * x - 4 * cube(x)
}

function sine(angle: number): number {
  return !(abs(angle) > 0.1) ? angle : p(sine(angle / 3))
}

test('1.15', () => {
  sine(12.15)
  expect(called.length).toEqual(5)
})
