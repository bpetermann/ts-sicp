function plus(a: number, b: number): number {
  return a + b
}

function minus(a: number, b: number): number {
  return a - b
}

function a_plus_abs_b(a: number, b: number): number {
  return (b >= 0 ? plus : minus)(a, b)
}

describe('1.4', () => {
  test('a_plus_abs_b minus_branch', () => {
    expect(a_plus_abs_b(1, -2)).toEqual(3)
  })
  test('a_plus_abs_b plus_branch', () => {
    expect(a_plus_abs_b(1, 2)).toEqual(3)
  })
})
