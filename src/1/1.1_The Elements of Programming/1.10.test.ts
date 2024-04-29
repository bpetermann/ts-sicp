function A(x: number, y: number): number {
  return y === 0 ? 0 : x === 0 ? 2 * y : y === 1 ? 2 : A(x - 1, A(x, y - 1))
}

test('1.9', () => {
  expect(A(1, 10)).toEqual(1024)
  expect(A(2, 4)).toEqual(65536)
  expect(A(3, 3)).toEqual(65536)
})
