import { head, list, tail, length } from 'sicp'

export type Pairs<T> = [T, Pairs<T> | [T, null] | null]
export type NumList = Pairs<number>

function last_pair(items: NumList): number {
  return length(items) === 1 ? head(items) : last_pair(tail(items) as NumList)
}

test('2.17', () => {
  expect(last_pair(list(23, 72, 149, 34))).toEqual(34)
})
