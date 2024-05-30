import { list } from 'sicp'
import { List } from '../2.2/2.17.test'
import { intersection_set, union_set } from './2.59.test'
import { Tree, tree_to_list_2 } from './2.63.test'
import { list_to_tree } from './2.64.test'

function union_tree_set(set1: Tree, set2: Tree): Tree {
  const list1 = tree_to_list_2(set1) as List
  const list2 = tree_to_list_2(set2) as List
  return list_to_tree(union_set(list1, list2) as List)
}

function intersection_tree_set(set1: Tree, set2: Tree): Tree {
  const list1 = tree_to_list_2(set1) as List
  const list2 = tree_to_list_2(set2) as List
  return list_to_tree(intersection_set(list1, list2) as List)
}

describe('2.66', () => {
  test('union_tree_set function', () => {
    expect(tree_to_list_2(union_tree_set(list_to_tree(list(10, 20, 30)), list_to_tree(list(10, 15, 30))))).toEqual([
      20,
      [10, [15, [30, null]]]
    ])
  })

  test('intersection_tree_set function', () => {
    expect(
      tree_to_list_2(intersection_tree_set(list_to_tree(list(10, 20, 30)), list_to_tree(list(10, 15, 30))))
    ).toEqual([10, [30, null]])
  })
})
