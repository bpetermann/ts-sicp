import { list, pair } from 'sicp'
import { accumulate } from './2.33.test'
import { List, ListNode } from './2.17.test'
import { filter, flatmap } from './2.40.test'

function enumerate_interval(low: number, high: number): ListNode {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high))
}

export function map<T>(f: (x: T) => T, sequence: List): T {
  return accumulate<T>((x, y) => pair(f(x), y) as T, null as T, sequence)
}

function unique_triples(n: number): List {
  return flatmap<ListNode>(
    (i) =>
      flatmap<ListNode>(
        (j) => map((k) => list(i, j, k as ListNode), enumerate_interval(1, (j as number) - 1) as never),
        enumerate_interval(1, (i as number) - 1) as never
      ),
    enumerate_interval(1, n) as never
  )
}
function plus(x: number, y: number): number {
  return x + y
}
function triples_that_sum_to(s: number, n: number): List {
  return filter((items) => accumulate(plus, 0, items) === s, unique_triples(n))
}

describe('2.40', () => {
  expect(triples_that_sum_to(10, 6)).toEqual([
    [5, [3, [2, null]]],
    [
      [5, [4, [1, null]]],
      [[6, [3, [1, null]]], null]
    ]
  ])
})
