test('1.20', () => {
  let called = -1

  function gcd(a: number, b: number): number {
    called += 1
    return b === 0 ? a : gcd(b, a % b)
  }

  gcd(206, 40)
  // Applicative order evaluation
  expect(called).toEqual(4)
})
