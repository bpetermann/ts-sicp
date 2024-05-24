import { is_null, head, tail, list } from 'sicp'
import { List, ListNode, as_list } from './2.17.test'
import { accumulate } from './2.33.test'

function divide(x: number, y: number): number {
  return x / y
}

export function fold_left<T>(op: (x: T, y: T) => T, initial: T, sequence: List): T {
  function iter(result: T, rest: List): T {
    return is_null(rest) ? result : iter(op(result, head(rest) as T), as_list(tail(rest)))
  }
  return iter(initial, sequence)
}

const fold_right = accumulate

describe('2.38', () => {
  expect(fold_right(divide, 1, list(1, 2, 3))).toBeCloseTo(3 / 2 / 1)
  expect(fold_left(divide, 1, list(1, 2, 3))).toBeCloseTo(1 / 2 / 3)
  expect(fold_right<ListNode>(list, null, list(1, 2, 3))).toEqual([1, [[2, [[3, [null, null]], null]], null]])
  expect(fold_left<ListNode>(list, null, list(1, 2, 3))).toEqual([
    [
      [null, [1, null]],
      [2, null]
    ],
    [3, null]
  ])
})
