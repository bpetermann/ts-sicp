import { list, length, append, error, head, is_null, pair, tail } from 'sicp'
import { generate_huffman_tree } from './2.69.test'
import { ListNode, List } from '../2.2/2.17.test'
import { member } from './2.53.test'
import { is_leaf, symbols, Tree, left_branch, right_branch } from './2.67.test'

const sample_frequencies = list(
  list('A', 2),
  list('NA', 16),
  list('BOOM', 1),
  list('SHA', 3),
  list('GET', 2),
  list('YIP', 9),
  list('JOB', 2),
  list('WAH', 2)
)

const lyrics = list(
  'GET',
  'A',
  'JOB',
  'SHA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'GET',
  'A',
  'JOB',
  'SHA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'NA',
  'WAH',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'YIP',
  'SHA',
  'BOOM'
)

export function encode_symbol(symbol: string, tree: Tree): ListNode | void {
  function contains_symbol(symbol: string, current_tree: Tree): boolean {
    return !is_null(member(symbol, symbols(current_tree)))
  }

  if (is_leaf(tree)) {
    return null
  } else {
    const left_tree = left_branch(tree) as Tree
    const right_tree = right_branch(tree) as Tree
    return contains_symbol(symbol, left_tree)
      ? (pair(0, encode_symbol(symbol, left_tree)) as List)
      : contains_symbol(symbol, right_tree)
        ? (pair(1, encode_symbol(symbol, right_tree)) as List)
        : error('symbol not found -- encode_symbol')
  }
}

export function encode(message: ListNode, tree: Tree): ListNode {
  return is_null(message)
    ? null
    : append(encode_symbol(head(message as List) as string, tree) as List, encode(tail(message as List), tree) as List)
}

describe('2.70', () => {
  const tree = generate_huffman_tree(sample_frequencies)

  expect(length(encode(lyrics, tree))).toEqual(84)
})
