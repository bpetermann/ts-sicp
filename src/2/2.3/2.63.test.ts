import { head, tail, list, is_null, append, pair } from 'sicp'
import { List, ListNode } from '../2.2/2.17.test'

type Tree = [ListNode, List]

function entry(tree: Tree): ListNode {
  return head(tree)
}

function left_branch(tree: Tree): Tree {
  return head(tail(tree)) as Tree
}

function right_branch(tree: Tree): Tree {
  return head(tail(tail(tree)) as Tree) as Tree
}

function make_tree(entry: ListNode, left: ListNode, right: ListNode): Tree {
  return list(entry, left, right)
}

function tree_to_list_1(tree: Tree): ListNode {
  return is_null(tree)
    ? null
    : append(tree_to_list_1(left_branch(tree)) as Tree, pair(entry(tree), tree_to_list_1(right_branch(tree))))
}

function tree_to_list_2(tree: Tree): ListNode {
  function copy_to_list(tree: Tree, result_list: ListNode): ListNode {
    return is_null(tree)
      ? result_list
      : copy_to_list(left_branch(tree), pair(entry(tree), copy_to_list(right_branch(tree), result_list)))
  }
  return copy_to_list(tree, null)
}

test('2.63', () => {
  const tree = make_tree(10, null, make_tree(30, make_tree(20, null, null), null))
  expect(tree_to_list_1(tree)).toEqual(tree_to_list_2(tree))
})
