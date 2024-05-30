import { head, is_null, list, map, pair, tail } from 'sicp'
import { accumulate } from './2.33.test'
import { List, ListNode, as_list } from './2.17.test'

function plus(x: number, y: number): number {
  return x + y
}

export function accumulate_n<T>(op: (x: T, y: T) => T, init: T, seqs: List): ListNode {
  return is_null(head(seqs))
    ? null
    : (pair(
        accumulate(
          op,
          init,
          map((x) => head(as_list(x)), seqs as never)
        ),
        accumulate_n(
          op,
          init,
          map((x) => tail(as_list(x)), seqs as never)
        )
      ) as List)
}

test('2.36', () => {
  const seq_seq = list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9), list(10, 11, 12))
  const expected = list(22, 26, 30)

  expect(accumulate_n(plus, 0, seq_seq)).toEqual(expected)
})
