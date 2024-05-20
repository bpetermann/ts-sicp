import { list, head, tail, is_null } from 'sicp'
import { List } from './2.17.test'

type Curry = (x: number) => number | Curry

function plus_curried(x: number): (y: number) => number {
  return (y) => x + y
}

function brooks(f: Curry, items: List): Curry {
  return is_null(items) ? f : brooks(f(head(items) as number) as Curry, tail(items as [number, List]))
}

function brooks_curried(items: [Curry, List]): Curry {
  return brooks(head(items), tail(items))
}

test('2.21', () => {
  expect(brooks(plus_curried, list(3, 4))).toEqual(7)
  expect(brooks_curried(list(plus_curried, 3, 4))).toEqual(7)
  expect(brooks(plus_curried, list(3, 4))).toEqual(brooks_curried(list(plus_curried, 3, 4)))
})
