import { is_pair, list, map } from 'sicp'
import { square } from '../../../utils'
import { List, ListNode } from './2.17.test'

type TreeNode = ListNode
type Tree = List

function is_num(x: TreeNode): x is number {
  return !is_pair(x)
}

function tree_map(scale: (x: number) => number, tree: Tree): Tree {
  return map(
    (sub_tree: TreeNode) => (!is_num(sub_tree) ? tree_map(scale, sub_tree as Tree) : scale(sub_tree)),
    tree as never
  )
}

function square_tree(tree: Tree): Tree {
  return tree_map(square, tree)
}

test('2.31', () => {
  const squared_tree = square_tree(list(1, list(2, list(3, 4), 5), list(6, 7)))

  const expected = [
    1,
    [
      [
        4,
        [
          [9, [16, null]],
          [25, null]
        ]
      ],
      [[36, [49, null]], null]
    ]
  ]
  expect(squared_tree).toEqual(expected)
})
