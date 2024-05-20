import { head, is_null, list, pair, tail } from 'sicp'
import { NumList } from './2.17.test'

function reverse(items: NumList): NumList {
  function reverse_iter(items: NumList, result: NumList | null): NumList {
    return is_null(items)
      ? (result as NumList)
      : reverse_iter(tail(items) as NumList, pair(head(items), result) as NumList)
  }
  return reverse_iter(items, list())
}

test('2.18', () => {
  expect(reverse(list(1, 4, 9, 16, 25))).toEqual([25, [16, [9, [4, [1, null]]]]])
})
