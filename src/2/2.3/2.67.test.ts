import { list, head, tail, append, error, is_null, pair } from 'sicp'
import { List, ListNode, as_list } from '../2.2/2.17.test'

export type Tree = [
  'code_tree',
  [left_branch: Tree | Leaf, [right_branch: Tree | Leaf, [symbols: Symbols, weight: Weight]]]
]

export type Leaf = ['leaf', [symbol: Symbols, weight: Weight]]

type Weight = [weight: number, null]

export type Symbols = List

type Bit = 0 | 1

export function make_leaf(symbol: string, weight: number): Leaf {
  return list('leaf', symbol, weight) as unknown as Leaf
}

export function is_leaf(object: List): object is Leaf {
  return head(object) === 'leaf'
}
function symbol_leaf(x: Leaf): string {
  return head(tail(x)) as unknown as string
}

function weight_leaf(x: Leaf): number {
  return head(tail(tail(x)))
}

export function left_branch(tree: Tree) {
  return head(tail(tree))
}

export function right_branch(tree: Tree) {
  return head(tail(tail(tree)))
}

export function symbols(tree: Leaf | Tree): Symbols {
  return is_leaf(tree) ? list(symbol_leaf(tree)) : head(tail(tail(tail(tree))))
}

export function weight(tree: Tree | Leaf): number {
  return is_leaf(tree) ? weight_leaf(tree) : head(tail(tail(tail(tail(tree)))))
}

export function make_code_tree(left: Tree | Leaf, right: Tree | Leaf): Tree {
  return list(
    'code_tree',
    left,
    right,
    append(as_list(symbols(left)), as_list(symbols(right))),
    weight(left) + weight(right)
  ) as Tree
}

export function decode(bits: List, tree: Tree): ListNode {
  function decode_1(bits: List, current_branch: Tree): ListNode {
    if (is_null(bits)) {
      return null
    } else {
      const next_branch = choose_branch(head(bits) as Bit, current_branch)
      return is_leaf(next_branch as Tree | Leaf)
        ? pair(symbol_leaf(next_branch as Leaf), decode_1(tail(bits) as List, tree))
        : decode_1(tail(bits) as List, next_branch as Tree)
    }
  }
  return decode_1(bits, tree)
}

export function choose_branch(bit: Bit, branch: Tree) {
  return bit === 0 ? left_branch(branch) : bit === 1 ? right_branch(branch) : error(bit, 'bad bit -- choose_branch')
}

const sample_tree = make_code_tree(
  make_leaf('A', 4),
  make_code_tree(make_leaf('B', 2), make_code_tree(make_leaf('D', 1), make_leaf('C', 1)))
)
const sample_message = list(0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0)

test('2.67', () => {
  expect(decode(sample_message, sample_tree)).toEqual(['A', ['D', ['A', ['B', ['B', ['C', ['A', null]]]]]]])
})
