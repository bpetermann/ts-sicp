import { list, map, pair } from 'sicp'
import { accumulate } from './2.33.test'
import { accumulate_n } from './2.36.test'
import { List, ListNode } from './2.17.test'

function plus(x: number, y: number): number {
  return x + y
}

function times(x: number, y: number): number {
  return x * y
}

function dot_product(v: List, w: List): number {
  return accumulate(plus, 0, accumulate_n(times, 1, list(v, w)))
}

function matrix_times_vector(m: List, v: List) {
  return map((row) => dot_product(row as List, v), m as never)
}

function transpose(mat: List): List {
  return accumulate_n<ListNode>(pair, null, mat)
}

function matrix_times_matrix(n: List, m: List): List {
  const cols = transpose(m)
  return map((x) => map((y) => dot_product(x as List, y as List), cols as never), n as never)
}

describe('2.36', () => {
  const v = list(10, 20, 30)
  const m1 = list(list(1, 2, 3), list(3, 5, 1), list(1, 1, 1))
  const m2 = list(list(1, 2, 3), list(4, 5, 6), list(7, 8, 9))

  test('(matrix_times_vector function', () => {
    expect(matrix_times_vector(m1, v)).toEqual([140, [160, [60, null]]])
  })
  test('transpose function', () => {
    expect(transpose(m1)).toEqual([
      [1, [3, [1, null]]],
      [
        [2, [5, [1, null]]],
        [[3, [1, [1, null]]], null]
      ]
    ])
  })
  test('matrix_times_matrix function', () => {
    expect(matrix_times_matrix(m1, m2)).toEqual([
      [30, [36, [42, null]]],
      [
        [30, [39, [48, null]]],
        [[12, [15, [18, null]]], null]
      ]
    ])
  })
})
