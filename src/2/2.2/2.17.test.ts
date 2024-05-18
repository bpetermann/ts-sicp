import { head, list, tail, length } from 'sicp'

export type Pairs<T> = [T, Pairs<T> | [T, null] | null]

function last_pair<T extends number>(items: Pairs<T>): number {
  return length(items) === 1 ? head(items) : last_pair(tail(items) as Pairs<T>)
}

test('2.17', () => {
  expect(last_pair(list(23, 72, 149, 34))).toEqual(34)
})
