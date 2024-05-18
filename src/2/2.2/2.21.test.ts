import { list, head, tail, is_null, pair, map } from 'sicp'
import { Pairs } from './2.17.test'

function square_list<T extends number>(items: Pairs<T>): Pairs<T> {
  return is_null(items)
    ? (null as unknown as Pairs<T>)
    : (pair(head(items) * head(items), square_list(tail(items) as Pairs<T>)) as Pairs<T>)
}

function square_list_2<T extends number>(items: Pairs<T>) {
  return map((x: number) => x * x, items)
}

test('2.21', () => {
  expect(square_list(list(1, 2, 3, 4))).toEqual([1, [4, [9, [16, null]]]])
  expect(square_list_2(list(1, 2, 3, 4))).toEqual([1, [4, [9, [16, null]]]])
})
