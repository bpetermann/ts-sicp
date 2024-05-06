import { is_even, double, halve } from '../../../utils'

function fast_times_iter(total: number, a: number, b: number): number {
  return b === 1
    ? total + a
    : a === 0 || b === 0
      ? 0
      : is_even(b)
        ? fast_times_iter(total, double(a), halve(b))
        : fast_times_iter(total + a, a, b - 1)
}

function times(a: number, b: number): number {
  return fast_times_iter(0, a, b)
}

test('1.18', () => {
  expect(times(3, 4)).toEqual(12)
  expect(times(5, 9)).toEqual(45)
  expect(times(8, 8)).toEqual(64)
  expect(times(7, 7)).toEqual(49)
  expect(times(3, 1)).toEqual(3)
})
