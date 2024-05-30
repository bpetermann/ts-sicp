import { is_null, head, tail, pair, append } from 'sicp'
import { ListNode, List, as_list } from '../2.2/2.17.test'
import { equal } from './2.59.test'

describe('2.60', () => {
  function is_element_of_set(x: ListNode, set: ListNode): boolean {
    return is_null(set) ? false : equal(x, head(as_list(set))) ? true : is_element_of_set(x, tail(as_list(set)))
  }

  function adjoin_set(x: ListNode, set: ListNode): List {
    return pair(x, set)
  }

  function intersection_set(set1: List, set2: List): ListNode {
    return is_null(set1) || is_null(set2)
      ? null
      : is_element_of_set(head(set1), set2)
        ? pair(head(set1), pair(head(set1), intersection_set(as_list(tail(set1)), set2)))
        : intersection_set(as_list(tail(set1)), set2)
  }

  function union_set(set1: List, set2: List): List {
    return append(set1, set2)
  }

  test('intersection_set with duplicates allowed', () => {
    expect(
      intersection_set(
        adjoin_set(10, adjoin_set(20, adjoin_set(30, null))),
        adjoin_set(10, adjoin_set(15, adjoin_set(20, null)))
      )
    ).toEqual([10, [10, [20, [20, null]]]])
  })

  test('union_set with duplicates allowed', () => {
    expect(
      union_set(
        adjoin_set(10, adjoin_set(20, adjoin_set(30, null))),
        adjoin_set(10, adjoin_set(15, adjoin_set(20, null)))
      )
    ).toEqual([10, [20, [30, [10, [15, [20, null]]]]]])
  })
})
