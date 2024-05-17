import { head, is_null, list, pair, tail } from 'sicp'

type Nested<T> = [T, Nested<T>]

function reverse<T>(items: Nested<T>): Nested<T> {
  function reverse_iter(items: Nested<T>, result: Nested<T> | null): Nested<T> {
    return is_null(items) ? (result as Nested<T>) : reverse_iter(tail(items), pair(head(items), result as Nested<T>))
  }
  return reverse_iter(items, list())
}

test('2.6', () => {
  expect(reverse(list(1, 4, 9, 16, 25))).toEqual([25, [16, [9, [4, [1, null]]]]])
})
