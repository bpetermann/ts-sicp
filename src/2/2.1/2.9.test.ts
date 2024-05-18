import { Interval, add_interval, lower_bound, make_interval, upper_bound } from './2.7.test'
import { math_max, math_min } from 'sicp'

function width_interval(x: Interval): number {
  return (upper_bound(x) - lower_bound(x)) / 2
}

export function mul_interval(x: Interval, y: Interval): Interval {
  const p1 = lower_bound(x) * lower_bound(y)
  const p2 = lower_bound(x) * upper_bound(y)
  const p3 = upper_bound(x) * lower_bound(y)
  const p4 = upper_bound(x) * upper_bound(y)
  return make_interval(math_min(p1, p2, p3, p4), math_max(p1, p2, p3, p4))
}

test('2.7', () => {
  const interval_1 = make_interval(1, 2)
  const interval_2 = make_interval(3, 5)
  const interval_1_width = width_interval(interval_1)
  const interval_2_width = width_interval(interval_2)

  expect(width_interval(add_interval(interval_1, interval_2))).toEqual(interval_1_width + interval_2_width)
  expect(width_interval(mul_interval(interval_1, interval_2))).not.toEqual(interval_1_width + interval_2_width)
})
