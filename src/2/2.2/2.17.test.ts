import { head, list, tail, length } from 'sicp'

type Nested<Pair> = [Pair, Nested<Pair>]

function last_pair<Pair>(items: Nested<Pair>): number {
  return length(items) === 1 ? (head(items) as number) : last_pair(tail(items))
}

test('2.17', () => {
  expect(last_pair(list(23, 72, 149, 34))).toEqual(34)
})
