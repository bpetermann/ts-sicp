import { head, is_null, pair, tail } from 'sicp'
import { ListNode, List } from '../2.2/2.17.test'

describe('2.62', () => {
  function adjoin_set(x: number, set: ListNode): List {
    return is_null(set) || (head(set as List) as number) > x
      ? pair(x, set)
      : pair(head(set as List), adjoin_set(x, tail(set as List)))
  }

  function union_set(set1: List, set2: List): List {
    if (is_null(set1)) {
      return set2
    } else if (is_null(set2)) {
      return set1
    } else {
      const x1 = head(set1) as number
      const x2 = head(set2) as number
      return x1 === x2
        ? pair(x1, union_set(tail(set1) as List, tail(set2) as List))
        : x1 < x2
          ? pair(x1, union_set(tail(set1) as List, set2))
          : pair(x2, union_set(set1, tail(set2) as List))
    }
  }
  test('union_set for sets represented as ordered lists. ', () => {
    expect(
      union_set(
        adjoin_set(10, adjoin_set(20, adjoin_set(30, null))),
        adjoin_set(10, adjoin_set(15, adjoin_set(20, null)))
      )
    ).toEqual([10, [15, [20, [30, null]]]])
  })
})
