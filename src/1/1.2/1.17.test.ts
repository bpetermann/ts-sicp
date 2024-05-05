import { is_even } from '../../../utils'

function double(x: number): number {
  return x + x
}

function halve(x: number): number {
  return x / 2
}

function times(a: number, b: number): number {
  return b === 0 ? 0 : is_even(b) ? times(double(a), halve(b)) : a + times(a, b - 1)
}

test('1.16', () => {
  expect(times(3, 4)).toEqual(12)
  expect(times(5, 9)).toEqual(45)
  expect(times(8, 8)).toEqual(64)
  expect(times(7, 7)).toEqual(49)
  expect(times(3, 1)).toEqual(3)
})
