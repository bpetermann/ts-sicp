import { stringify, head, tail, pair } from 'sicp'

export type Interval = [number, number]

export function make_interval(x: number, y: number): Interval {
  return pair(x, y)
}
export function lower_bound(i: Interval): number {
  return head(i)
}
export function upper_bound(i: Interval): number {
  return tail(i)
}

export function print_interval(i: Interval): string {
  return '[ ' + stringify(lower_bound(i)) + ' , ' + stringify(upper_bound(i)) + ' ]'
}

export function add_interval(x: Interval, y: Interval): Interval {
  return make_interval(lower_bound(x) + lower_bound(y), upper_bound(x) + upper_bound(y))
}

test('2.7', () => {
  expect(print_interval(add_interval(make_interval(1, 2), make_interval(3, 5)))).toEqual('[ 4 , 7 ]')
})
