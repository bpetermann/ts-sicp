import { is_null, list, head, pair, tail, length } from 'sicp'
import { weight, make_leaf, Leaf, make_code_tree, Tree } from './2.67.test'
import { List, ListNode, as_list } from '../2.2/2.17.test'

function adjoin_set(x: Leaf | Tree, set: ListNode): List {
  return is_null(set)
    ? list(x)
    : weight(x) < weight(head(set as List) as Leaf)
      ? pair(x, set)
      : pair(head(set as List), adjoin_set(x, tail(set as List)))
}

function make_leaf_set(pairs: ListNode): ListNode {
  if (is_null(pairs)) {
    return null
  } else {
    const first_pair = head(pairs as List) as [string, [number, null]]
    return adjoin_set(make_leaf(head(first_pair), head(tail(first_pair))), make_leaf_set(tail(pairs as List)))
  }
}

function successive_merge(leaves: List): Tree {
  return length(leaves) === 1
    ? (head(leaves) as Tree)
    : successive_merge(
        adjoin_set(
          make_code_tree(head(leaves) as Leaf, head(as_list(tail(leaves))) as Leaf),
          tail(as_list(tail(leaves)))
        )
      )
}

export function generate_huffman_tree(pairs: List) {
  return successive_merge(make_leaf_set(pairs) as List)
}

const sample_tree = make_code_tree(
  make_leaf('A', 4),
  make_code_tree(make_leaf('B', 2), make_code_tree(make_leaf('D', 1), make_leaf('C', 1)))
)

const sample_frequencies = list(list('A', 4), list('B', 2), list('C', 1), list('D', 1))

generate_huffman_tree(sample_frequencies)

describe('2.69', () => {
  expect(generate_huffman_tree(sample_frequencies)).toEqual(sample_tree)
})
