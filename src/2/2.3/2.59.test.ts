import { is_null, head, tail, pair, is_pair } from 'sicp'
import { List, ListNode, as_list } from '../2.2/2.17.test'

function equal(xs: ListNode, ys: ListNode): boolean {
  return is_pair(xs)
    ? is_pair(ys) && equal(head(xs as List), head(ys as List)) && equal(tail(xs as List), tail(ys as List))
    : xs === ys
}

function is_element_of_set(x: ListNode, set: ListNode): boolean {
  return is_null(set)
    ? false
    : equal(x, head(set as List) as ListNode)
      ? true
      : is_element_of_set(x, tail(set as List) as ListNode)
}

function adjoin_set(x: ListNode, set: ListNode): List {
  return is_element_of_set(x, set) ? (set as List) : pair(x, set)
}

export function intersection_set(set1: List, set2: List): List {
  return is_null(set1) || is_null(set2)
    ? as_list(null)
    : is_element_of_set(head(set1), set2)
      ? pair(head(set1), intersection_set(tail(set1) as List, set2))
      : intersection_set(tail(set1) as List, set2)
}

function union_set(set1: List, set2: List): List {
  return is_null(set1) ? set2 : adjoin_set(head(set1), union_set(tail(set1) as List, set2))
}
test('2.59', () => {
  expect(
    union_set(
      adjoin_set(10, adjoin_set(20, adjoin_set(30, null))),
      adjoin_set(10, adjoin_set(15, adjoin_set(20, null)))
    )
  ).toEqual([30, [10, [15, [20, null]]]])
})
