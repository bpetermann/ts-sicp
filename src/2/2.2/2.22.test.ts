import { is_null, tail, pair, head, list } from 'sicp'
import { square } from '../../../utils'
import { List, ListNode, as_list } from './2.17.test'

describe('2.22', () => {
  it('should not produce the list in reverse order', () => {
    function square_list(items: List): List {
      function iter(things: List, answer: ListNode): ListNode {
        return is_null(things) ? answer : iter(tail(things) as List, pair(square(head(things) as number), answer))
      }
      return as_list(iter(items, null))
    }
    expect(square_list(list(1, 2, 3, 4))).not.toEqual(list(4, 3, 2, 1))
  })

  it('should not produce the list in reverse order', () => {
    function square_list(items: List): List {
      function iter(things: List, answer: ListNode): ListNode {
        return is_null(things) ? answer : iter(tail(things) as List, pair(answer, square(head(things) as number)))
      }
      return as_list(iter(items, null))
    }
    expect(square_list(list(1, 2, 3, 4))).not.toEqual(list(4, 3, 2, 1))
  })
})
