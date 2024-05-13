import { square } from '../../../utils'

function repeated(f: (n: number) => number, x: number): (y: number) => number {
  function repeat(i: number, result: number): number {
    return i === 0 ? result : repeat(i - 1, f(result))
  }

  return (y: number) => repeat(x, y)
}

test('1.43', () => {
  expect(repeated(square, 2)(5)).toEqual(625)
})
