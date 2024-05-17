import { pair } from 'sicp'
import { Interval, add_interval, make_interval } from './2.7.test'
import { mul_interval } from './2.9.test'
import { div_interval } from './2.10.test'

function par1(r1: Interval, r2: Interval): Interval {
  return div_interval(mul_interval(r1, r2), add_interval(r1, r2))
}

function par2(r1: Interval, r2: Interval): Interval {
  const one = make_interval(1, 1)
  return div_interval(one, add_interval(div_interval(one, r1), div_interval(one, r2)))
}

test('2.14', () => {
  expect(par1(pair(4, 6), pair(7, 8))).not.toEqual(par2(pair(4, 6), pair(7, 8)))
})
