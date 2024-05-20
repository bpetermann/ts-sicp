import { head, is_null, list, pair, tail } from 'sicp'
import { List, ListNode } from './2.17.test'

function reverse(items: List): List {
  function reverse_iter(items: List, result: List | ListNode): List {
    return is_null(items) ? (result as List) : reverse_iter(tail(items) as List, pair(head(items), result))
  }
  return reverse_iter(items, list())
}

test('2.18', () => {
  expect(reverse(list(1, 4, 9, 16, 25))).toEqual([25, [16, [9, [4, [1, null]]]]])
})
