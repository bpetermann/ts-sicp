import { pair, append, map, list, is_null, head, tail } from 'sicp'
import { accumulate } from './2.33.test'
import { List, ListNode, as_list } from './2.17.test'
import { square } from '../../../utils'

function enumerate_interval(low: number, high: number): ListNode {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high))
}

function make_pair_sum(pair: List) {
  return list(head(pair), head(as_list(tail(pair))), (head(pair) as number) + (head(as_list(tail(pair))) as number))
}

export function flatmap<T>(f: (x: T) => T, seq: List): List {
  return accumulate<List>(append, as_list(null), map(f, seq as never))
}

function filter(predicate: (x: List) => boolean, sequence: List): List {
  return is_null(sequence)
    ? as_list(null)
    : predicate(as_list(head(sequence)))
      ? pair(head(sequence), filter(predicate, as_list(tail(sequence))))
      : filter(predicate, as_list(tail(sequence)))
}

function remove(item: ListNode, sequence: List): List {
  return filter((x) => !(x === item), sequence)
}

function divides(a: number, b: number): boolean {
  return b % a === 0
}

function find_divisor(n: number, test_divisor: number): number {
  return square(test_divisor) > n ? n : divides(test_divisor, n) ? test_divisor : find_divisor(n, test_divisor + 1)
}

function smallest_divisor(n: number) {
  return find_divisor(n, 2)
}

function is_prime(n: number): boolean {
  return n === smallest_divisor(n)
}

function is_prime_sum(pair: List): boolean {
  return is_prime((head(pair) as number) + (head(as_list(tail(pair))) as number))
}

export function permutations(s: List): List {
  return is_null(s)
    ? as_list(list(null))
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      flatmap<ListNode>((x) => map((p: List) => pair(x, p), permutations(remove(x, as_list(s))) as any), s as never)
}

function unique_pairs(n: number): List {
  return flatmap(
    (i) => map((j) => list(i, j), enumerate_interval(1, (i as number) - 1) as never),
    enumerate_interval(1, n) as never
  )
}

function prime_sum_pairs(n: number): List {
  return map(make_pair_sum, filter(is_prime_sum, unique_pairs(n)) as never)
}

describe('2.40', () => {
  expect(prime_sum_pairs(6)).toEqual([
    [2, [1, [3, null]]],
    [
      [3, [2, [5, null]]],
      [
        [4, [1, [5, null]]],
        [
          [4, [3, [7, null]]],
          [
            [5, [2, [7, null]]],
            [
              [6, [1, [7, null]]],
              [[6, [5, [11, null]]], null]
            ]
          ]
        ]
      ]
    ]
  ])
})
