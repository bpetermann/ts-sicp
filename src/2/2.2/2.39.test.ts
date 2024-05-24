import { append, list, pair } from 'sicp'
import { fold_left } from './2.38.test'
import { List, ListNode, as_list } from './2.17.test'
import { accumulate } from './2.33.test'

const fold_right = accumulate

describe('2.39', () => {
  const l = list(1, 2, 3)
  const l_reverse = list(3, 2, 1)

  test('reverse with fold_right', () => {
    function reverse(sequence: List): List {
      return fold_right<ListNode>((x, y) => append(as_list(y), list(x)) as ListNode, null, sequence) as List
    }
    expect(reverse(l)).toEqual(l_reverse)
  })
  test('reverse with left_fold', () => {
    function reverse(sequence: List): List {
      return fold_left<ListNode>((x, y) => pair(y, x), null, sequence) as List
    }

    expect(reverse(l)).toEqual(l_reverse)
  })
})
