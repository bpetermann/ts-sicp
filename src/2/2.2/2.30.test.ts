import { is_null, is_pair, pair, head, tail, list, map } from 'sicp'

type TreeNode = number | null | Tree
type Tree = [TreeNode, TreeNode]

function is_num(x: Tree | number): x is number {
  return !is_pair(x)
}

function cast_as_tree(x: unknown): Tree {
  return x as unknown as Tree
}

function square_tree(tree: Tree): Tree {
  return is_null(tree)
    ? cast_as_tree(null)
    : is_num(tree)
      ? cast_as_tree(tree * tree)
      : pair(square_tree(head(tree) as Tree), square_tree(tail(tree) as Tree))
}

function square_tree_map(tree: Tree, scale: (x: number) => number): Tree {
  return map(
    (sub_tree: Tree | number) =>
      !is_num(sub_tree) ? square_tree_map(cast_as_tree(sub_tree), scale) : cast_as_tree(scale(sub_tree)),
    tree as never
  )
}

test('2.30', () => {
  const squared_tree = square_tree(list(1, list(2, list(3, 4), 5), list(6, 7)))
  const mapped_tree = square_tree_map(list(1, list(2, list(3, 4), 5), list(6, 7)), (x) => x * x)

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
  expect(mapped_tree).toEqual(expected)
})
