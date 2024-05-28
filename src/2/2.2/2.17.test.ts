import { head, list, tail, length } from 'sicp'

export type ListNode = number | null | List | string
export type List = [ListNode, ListNode]

export function as_list(x: unknown): List {
  return x as unknown as List
}

function last_pair(items: List): number {
  return length(items) === 1 ? (head(items) as number) : last_pair(tail(items) as List)
}

test('2.17', () => {
  expect(last_pair(list(23, 72, 149, 34))).toEqual(34)
})
