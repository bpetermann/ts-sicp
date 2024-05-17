import { make_interval, upper_bound, lower_bound, print_interval, Interval } from './2.7.test'
import { mul_interval } from './2.9.test'

export function div_interval(x: Interval, y: Interval): Interval {
  if (lower_bound(y) <= 0 && upper_bound(y) >= 0) throw new Error('division error (interval spans 0)')
  return mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)))
}

describe('2.10', () => {
  it('should work if both interval numbers are below zero', () => {
    expect(print_interval(div_interval(make_interval(1, 2), make_interval(-1, -4)))).toEqual('[ -2 , -0.25 ]')
  })

  test('should throw if only one number is below zero', () => {
    expect(() => {
      div_interval(make_interval(1, 2), make_interval(-1, 4))
    }).toThrow()
  })
})
