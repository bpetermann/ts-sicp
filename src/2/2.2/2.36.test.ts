import { head, is_null, list, map, pair, tail } from 'sicp'
import { accumulate } from './2.33.test'
import { List, as_list } from './2.17.test'

function accumulate_n(op: (x: number, y: number) => number, init: number, seqs: List): List {
  return is_null(head(seqs))
    ? as_list(null)
    : pair(
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
      )
}

describe('2.36', () => {
  const seq_seq = list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9), list(10, 11, 12))
  const expected = list(22, 26, 30)

  expect(accumulate_n((x, y) => x + y, 0, seq_seq)).toEqual(expected)
})
