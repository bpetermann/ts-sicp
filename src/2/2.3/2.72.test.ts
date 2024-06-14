import { is_null, pair, error } from 'sicp'
import { List, ListNode } from '../2.2/2.17.test'
import { member } from './2.53.test'
import { Tree, is_leaf, left_branch, make_code_tree, make_leaf, right_branch, symbols } from './2.67.test'

describe('2.72', () => {
  let called = 0

  function encode_symbol(symbol: string, tree: Tree): ListNode | void {
    called++

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
  const sample_tree = make_code_tree(
    make_leaf('A', 4),
    make_code_tree(make_leaf('B', 3), make_code_tree(make_leaf('C', 2), make_leaf('D', 1)))
  )
  test('number of steps to get to "D"', () => {
    encode_symbol('C', sample_tree)
    expect(called).toEqual(4)
  })
})
