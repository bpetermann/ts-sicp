import { Interval, lower_bound, make_interval, upper_bound } from './2.7.test'

function center(i: Interval): number {
  return (lower_bound(i) + upper_bound(i)) / 2
}

function make_center_width(c: number, w: number): Interval {
  return make_interval(c - w, c + w)
}

function make_center_percent(center: number, percent: number): Interval {
  const width = center * (percent / 100)
  return make_center_width(center, width)
}

function width(i: Interval): number {
  return (upper_bound(i) - lower_bound(i)) / 2
}

export function percent(i: Interval): number {
  return (width(i) / center(i)) * 100
}

test('2.12', () => {
  const my_interval = make_center_percent(6.0, 10)
  expect(percent(my_interval)).toBeCloseTo(9.99999999)
})
