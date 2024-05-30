import { list, head, tail, is_null, pair, map } from 'sicp'
import { List, ListNode, as_list } from './2.17.test'
import { square } from '../../../utils'

function square_list(items: List): ListNode {
  return is_null(items) ? null : pair(square(head(items) as number), as_list(square_list(tail(items) as List)))
}

function square_list_2(items: List) {
  return map((x: number) => x * x, items as never)
}

test('2.21', () => {
  expect(square_list(list(1, 2, 3, 4))).toEqual([1, [4, [9, [16, null]]]])
  expect(square_list_2(list(1, 2, 3, 4))).toEqual([1, [4, [9, [16, null]]]])
})
