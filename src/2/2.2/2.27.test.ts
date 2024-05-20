import { head, is_null, list, pair, tail, is_pair, append } from 'sicp'
import { List, ListNode, as_list } from './2.17.test'

function reverse(items: List): List {
  function reverse_iter(items: List, result: List | ListNode): List {
    return is_null(items) ? as_list(result) : reverse_iter(tail(items) as List, pair(head(items), result))
  }
  return reverse_iter(items, list())
}

function deep_reverse(items: List): List {
  function reverse_iter(items: List, result: List | ListNode): List {
    return is_null(items)
      ? as_list(result)
      : is_pair(items)
        ? append(deep_reverse(tail(items) as List), pair(deep_reverse(head(items) as List), null))
        : items
  }
  return reverse_iter(items, list())
}

test('2.27', () => {
  const list_1 = list(1, 2)
  const list_2 = list(3, 4)

  expect(reverse(list(list_1, list_2))).toEqual([
    [3, [4, null]],
    [[1, [2, null]], null]
  ])
  expect(deep_reverse(list(list_1, list_2))).toEqual([
    [4, [3, null]],
    [[2, [1, null]], null]
  ])
})
