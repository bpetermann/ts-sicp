import { is_null, head, tail, pair, list, append, error } from 'sicp'
import { Symbols, Tree, decode, make_code_tree, make_leaf, symbols } from './2.67.test'
import { List, ListNode } from '../2.2/2.17.test'

function encode(message: ListNode, tree: Tree): ListNode {
  return is_null(message)
    ? null
    : append(encode_symbol(head(message as List) as string, tree) as List, encode(tail(message as List), tree) as List)
}

function encode_symbol(symbol: string, tree: Tree): List | void {
  function iterate(symbol: string, symbols: Symbols): ListNode | void {
    return is_null(symbols)
      ? error('symbol not found -- encode_symbol')
      : symbol === head(symbols)
        ? is_null(tail(symbols))
          ? null
          : pair(0, null)
        : (pair(1, iterate(symbol, tail(symbols) as List)) as List)
  }
  return iterate(symbol, symbols(tree)) as List
}

const sample_tree = make_code_tree(
  make_leaf('A', 4),
  make_code_tree(make_leaf('B', 2), make_code_tree(make_leaf('D', 1), make_leaf('C', 1)))
)
const sample_message = list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0)

const decoded = decode(sample_message, sample_tree)

describe('2.68', () => {
  test('encode a decoded message ', () => {
    expect(encode(decoded, sample_tree)).toEqual(sample_message)
  })
  test('encode function with a symbol that is not in the tree', () => {
    expect(() => {
      encode_symbol('Z', sample_tree)
    }).toThrow()
  })
})
