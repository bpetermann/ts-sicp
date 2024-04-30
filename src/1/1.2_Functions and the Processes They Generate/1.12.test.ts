function pascal_triangle(row: number, col: number): number {
  return col > row ? 0 : col < 0 ? 0 : col === 1 ? 1 : pascal_triangle(row - 1, col - 1) + pascal_triangle(row - 1, col)
}

test('1.12', () => {
  expect(pascal_triangle(4, 2)).toEqual(3)
})
