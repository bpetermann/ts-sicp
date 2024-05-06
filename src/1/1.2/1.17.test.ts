import { is_even, double, halve } from '../../../utils'

function times(a: number, b: number): number {
  return b === 0 ? 0 : is_even(b) ? times(double(a), halve(b)) : a + times(a, b - 1)
}

test('1.17', () => {
  expect(times(3, 4)).toEqual(12)
  expect(times(5, 9)).toEqual(45)
  expect(times(8, 8)).toEqual(64)
  expect(times(7, 7)).toEqual(49)
  expect(times(3, 1)).toEqual(3)
})
