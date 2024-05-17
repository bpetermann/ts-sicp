import { lower_bound, make_interval, print_interval, upper_bound } from './2.7.test'

function sub_interval(x: [number, number], y: [number, number]): [number, number] {
  return make_interval(lower_bound(x) - upper_bound(y), upper_bound(x) - lower_bound(y))
}

test('2.7', () => {
  expect(print_interval(sub_interval(make_interval(1, 2), make_interval(3, 5)))).toEqual('[ -4 , -1 ]')
})
