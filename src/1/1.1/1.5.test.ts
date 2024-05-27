function p(): void {
  throw new Error('applicative-order evaluation')
}
function order_test(x: number, y: void) {
  return x === 0 ? 0 : y
}

describe('1.5', () => {
  test('should throw as js uses applicative-order evaluation', () => {
    expect(() => {
      order_test(0, p())
    }).toThrow()
  })
})
