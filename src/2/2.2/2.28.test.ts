import { is_null, is_pair, append, head, tail, list } from 'sicp'
import { List, ListNode, as_list } from './2.17.test'

function fringe(x: List): ListNode {
  return is_null(x)
    ? null
    : is_pair(x)
      ? append(as_list(fringe(head(x) as List)), as_list(fringe(tail(x) as List)))
      : list(x)
}

test('2.27', () => {
  const x = list(list(1, 2), list(3, 4))

  expect(fringe(list(x, x))).toEqual([1, [2, [3, [4, [1, [2, [3, [4, null]]]]]]]])
})
