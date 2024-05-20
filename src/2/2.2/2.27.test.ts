import { head, is_null, list, pair, tail, is_pair, append } from 'sicp'
import { Pairs, NumList } from './2.17.test'

function reverse<T extends NumList>(items: Pairs<T>): Pairs<T> {
  function reverse_iter(items: Pairs<T>, result: Pairs<T> | null): Pairs<T> {
    return is_null(items)
      ? (result as Pairs<T>)
      : reverse_iter(tail(items) as Pairs<T>, pair(head(items), result) as Pairs<T>)
  }
  return reverse_iter(items, list())
}

function deep_reverse<T extends NumList>(items: Pairs<T>): Pairs<T> {
  function reverse_iter(items: Pairs<T>, result: Pairs<T> | null): Pairs<T> {
    return is_null(items)
      ? (result as Pairs<T>)
      : is_pair(items)
        ? (append(
            deep_reverse(tail(items) as Pairs<T>),
            pair(deep_reverse(head(items) as unknown as Pairs<T>), null)
          ) as unknown as Pairs<T>)
        : (items as Pairs<T>)
  }
  return reverse_iter(items, list())
}

test('2.27', () => {
  const list_1 = list(1, 2)
  const list_2 = list(3, 4)

  expect(reverse(list(list_1, list_2))).toEqual([
    [3, [4, null]],
    [[1, [2, null]], null]
  ])
  expect(deep_reverse(list(list_1, list_2))).toEqual([
    [4, [3, null]],
    [[2, [1, null]], null]
  ])
})
