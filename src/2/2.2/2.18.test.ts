import { head, is_null, list, pair, tail } from 'sicp'
import { Pairs } from './2.17.test'

function reverse<T extends number>(items: Pairs<T>): Pairs<T> {
  function reverse_iter(items: Pairs<T>, result: Pairs<T> | null): Pairs<T> {
    return is_null(items)
      ? (result as Pairs<T>)
      : reverse_iter(tail(items) as Pairs<T>, pair(head(items), result) as Pairs<T>)
  }
  return reverse_iter(items, list())
}

test('2.18', () => {
  expect(reverse(list(1, 4, 9, 16, 25))).toEqual([25, [16, [9, [4, [1, null]]]]])
})
