import { is_null, is_pair, append, head, tail, list } from 'sicp'
import { List, as_list } from './2.17.test'

function fringe(x: List): List {
  return is_null(x) ? as_list(null) : is_pair(x) ? append(fringe(head(x) as List), fringe(tail(x) as List)) : list(x)
}

test('2.27', () => {
  const x = list(list(1, 2), list(3, 4))

  expect(fringe(list(x, x))).toEqual([1, [2, [3, [4, [1, [2, [3, [4, null]]]]]]]])
})
