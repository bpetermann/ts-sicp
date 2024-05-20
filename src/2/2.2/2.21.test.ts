import { list, head, tail, is_null, pair, map } from 'sicp'
import { NumList } from './2.17.test'

function square_list(items: NumList): NumList {
  return is_null(items)
    ? (null as unknown as NumList)
    : (pair(head(items) * head(items), square_list(tail(items) as NumList)) as NumList)
}

function square_list_2(items: NumList) {
  return map((x: number) => x * x, items)
}

test('2.21', () => {
  expect(square_list(list(1, 2, 3, 4))).toEqual([1, [4, [9, [16, null]]]])
  expect(square_list_2(list(1, 2, 3, 4))).toEqual([1, [4, [9, [16, null]]]])
})
