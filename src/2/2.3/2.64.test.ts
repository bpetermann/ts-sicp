import { head, tail, list, pair, length } from 'sicp'
import { math_floor } from '../../../utils'
import { Tree, make_tree } from './2.63.test'
import { List } from '../2.2/2.17.test'

function list_to_tree(elements: List): Tree {
  return head(partial_tree(elements, length(elements)))
}

/**
 * Takes a list of elements and the length of the elements and returns a pair,
 * whose head is a binary tree for the first (n−1)/2 elements.
 * The middle element of the resulting list forms the root element of the binary tree.
 * The elements up to the middle part form the left part and the remaining elements
 * form the right part
 *
 * @param elts a List of elements
 * @param n the length of elts
 * @returns a Pair whose  head is the constructed tree and whose
 * tail is the list of elements not included in the tree
 */

function partial_tree(elts: List, n: number): [Tree, List] {
  if (n === 0) {
    return pair(null as unknown as Tree, elts)
  } else {
    const left_size = math_floor((n - 1) / 2)
    const left_result = partial_tree(elts, left_size)
    const left_tree = head(left_result)
    const non_left_elts = tail(left_result)
    const right_size = n - (left_size + 1)
    const this_entry = head(non_left_elts)
    const right_result = partial_tree(tail(non_left_elts) as List, right_size)
    const right_tree = head(right_result)
    const remaining_elts = tail(right_result)
    return pair(make_tree(this_entry, left_tree, right_tree), remaining_elts)
  }
}

describe('2.64', () => {
  test('a tree with 3 elements', () => {
    expect(list_to_tree(list(10, 20, 30))).toEqual([
      20,
      [
        [10, [null, [null, null]]],
        [[30, [null, [null, null]]], null]
      ]
    ])
  })
  test('a tree with 0 elements', () => {
    expect(list_to_tree(list(0))).toEqual([0, [null, [null, null]]])
  })
})
