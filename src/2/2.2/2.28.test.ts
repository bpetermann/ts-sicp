import { is_null, is_pair, append, head, tail, list } from 'sicp'
import { Pairs } from './2.17.test'

function fringe<T extends Pairs<unknown[]>>(x: Pairs<T>): Pairs<unknown[]> {
  return is_null(x)
    ? (null as unknown as Pairs<unknown[]>)
    : is_pair(x)
      ? append(fringe(head(x) as unknown as Pairs<T>), fringe(tail(x) as Pairs<T>))
      : list(x)
}

test('2.27', () => {
  const x = list(list(1, 2), list(3, 4))

  expect(fringe(list(x, x))).toEqual([1, [2, [3, [4, [1, [2, [3, [4, null]]]]]]]])
})
