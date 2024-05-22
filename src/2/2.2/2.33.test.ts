import { is_null, head, tail, pair, list } from 'sicp'
import { List, ListNode, as_list } from './2.17.test'

export function accumulate<T>(op: (x: T, y: T) => T, initial: T, sequence: List): T {
  return is_null(sequence) ? initial : op(head(sequence) as T, accumulate(op, initial, as_list(tail(sequence))))
}
export function map(f: (x: number) => number, sequence: List): ListNode {
  return accumulate<ListNode>((x, y) => pair(f(x as number), y), null, sequence)
}
export function append(seq1: List, seq2: List): List {
  return accumulate(pair, seq1, seq2)
}
export function length(sequence: List): number {
  return accumulate((_, y) => 1 + y, 0, sequence)
}

describe('2.33', () => {
  test('map function', () => {
    expect(map((x) => x * 2, list(1, 2, 3, 4))).toEqual([2, [4, [6, [8, null]]]])
  }),
    test('append function', () => {
      expect(append(list(5, 6, 7, 8), list(1, 2, 3, 4))).toEqual([1, [2, [3, [4, [5, [6, [7, [8, null]]]]]]]])
    })
  test('length function', () => {
    expect(length(list(0, 1, 2, 3, 4, 5, 6, 7, 8, 9))).toEqual(10)
  })
})
