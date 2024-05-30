import { pair, head, tail, is_null } from 'sicp'
import { Tree, make_tree, left_branch, right_branch } from './2.63.test'

type Record = [key: number, data: string]
type ListNode = null | List | Record
type List = [ListNode, ListNode]

function make_record(key: number, data: string): Record {
  return pair(key, data)
}
function key(record: Record): number {
  return head(record)
}

export function data(record: Record): string {
  return tail(record)
}

function lookup(given_key: number, set_of_records: Tree): Record | false {
  return is_null(set_of_records)
    ? false
    : given_key === key(head(set_of_records) as Record)
      ? (head(set_of_records) as Record)
      : given_key < key(head(set_of_records) as Record)
        ? lookup(given_key, left_branch(set_of_records) as Tree)
        : lookup(given_key, right_branch(set_of_records) as Tree)
}

describe('2.66', () => {
  const expected = make_record(3, 'Earth')

  const root = make_record(4, 'Mars')
  const left_tree = make_tree(make_record(2, 'Venus'), null, make_tree(expected, null, null))
  const right_tree = make_tree(make_record(6, 'Saturn'), make_tree(make_record(5, 'Jupiter'), null, null), null)

  const tree = make_tree(root, left_tree, right_tree)

  it('should find the record in the tree', () => {
    expect(lookup(3, tree)).toEqual(expected)
  })

  it('should find the record in the tree', () => {
    expect(lookup(4, tree)).toEqual(root)
  })
})
