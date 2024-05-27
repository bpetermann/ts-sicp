/* eslint-disable @typescript-eslint/no-explicit-any */
function f(g: any) {
  return g(2)
}

test('1.33', () => {
  expect(() => f(f)).toThrow(new TypeError('g is not a function'))
})
