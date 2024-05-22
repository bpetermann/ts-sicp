import { is_pair, list, pair, map } from 'sicp'
import { accumulate } from './2.33.test'
import { List, ListNode, as_list } from './2.17.test'

function count_leaves(t: List): number {
  return accumulate<number>(
    (leaves, total) => leaves + total,
    0,
    map((x: ListNode) => (is_pair(x) ? count_leaves(as_list(x)) : 1), t as never)
  )
}

describe('2.35', () => {
  expect(count_leaves(pair(list(1, 2), list(3, 4)))).toEqual(4)
})
