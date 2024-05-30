import { head, is_null, pair, tail } from 'sicp'
import { ListNode, List } from '../2.2/2.17.test'

describe('2.61', () => {
  function adjoin_set(x: number, set: ListNode): List {
    return is_null(set) || (head(set as List) as number) > x
      ? pair(x, set)
      : pair(head(set as List), adjoin_set(x, tail(set as List)))
  }

  test('adjoin_set using the ordered representation', () => {
    expect(adjoin_set(10, adjoin_set(15, adjoin_set(20, null)))).toEqual([10, [15, [20, null]]])
  })
})
