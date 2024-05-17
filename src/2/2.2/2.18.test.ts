import { head, is_null, list, pair, tail } from 'sicp'

type Nested<Pair> = [Pair, Nested<Pair>]

function reverse<Pair>(items: Nested<Pair>): Nested<Pair> {
  function reverse_iter(items: Nested<Pair>, result: Nested<Pair> | null): Nested<Pair> {
    return is_null(items)
      ? (result as Nested<Pair>)
      : reverse_iter(tail(items), pair(head(items), result as Nested<Pair>))
  }
  return reverse_iter(items, list())
}

test('2.18', () => {
  expect(reverse(list(1, 4, 9, 16, 25))).toEqual([25, [16, [9, [4, [1, null]]]]])
})
