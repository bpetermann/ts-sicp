import { math_min, math_max } from 'sicp'
import { Interval, lower_bound, make_interval, upper_bound } from './2.7.test'

function p(n: number): boolean {
  return n >= 0
}
function n(n: number): boolean {
  return !p(n)
}
function the_trouble_maker(xl: number, xu: number, yl: number, yu: number): Interval {
  const p1 = xl * yl
  const p2 = xl * yu
  const p3 = xu * yl
  const p4 = xu * yu
  return make_interval(math_min(p1, p2, p3, p4), math_max(p1, p2, p3, p4))
}

function mul_interval(x: Interval, y: Interval): Interval | Error {
  const xl = lower_bound(x)
  const xu = upper_bound(x)
  const yl = lower_bound(y)
  const yu = upper_bound(y)
  return p(xl) && p(xu) && p(yl) && p(yu)
    ? make_interval(xl * yl, xu * yu)
    : p(xl) && p(xu) && n(yl) && p(yu)
      ? make_interval(xu * yl, xu * yu)
      : p(xl) && p(xu) && n(yl) && n(yu)
        ? make_interval(xu * yl, xl * yu)
        : n(xl) && p(xu) && p(yl) && p(yu)
          ? make_interval(xl * yu, xu * yu)
          : n(xl) && p(xu) && n(yl) && n(yu)
            ? make_interval(xu * yl, xl * yl)
            : n(xl) && n(xu) && p(yl) && p(yu)
              ? make_interval(xl * yu, xu * yl)
              : n(xl) && n(xu) && n(yl) && p(yu)
                ? make_interval(xl * yu, xl * yl)
                : n(xl) && n(xu) && n(yl) && n(yu)
                  ? make_interval(xu * yu, xl * yl)
                  : n(xl) && p(xu) && n(yl) && p(yu)
                    ? the_trouble_maker(xl, xu, yl, yu)
                    : Error('lower larger than upper')
}

test('2.11', () => {
  expect(mul_interval(make_interval(1, 2), make_interval(3, 5))).toEqual([3, 10])
})
