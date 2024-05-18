import { list, head, tail, is_null } from 'sicp'
import { Pairs } from './2.17.test'

type Curry = (x: number) => number | Curry

function plus_curried(x: number): (y: number) => number {
  return (y) => x + y
}

function brooks<T extends number>(f: Curry, items: Pairs<T>): Curry {
  return is_null(items) ? f : brooks(f(head(items)) as Curry, tail(items as [T, Pairs<T>]))
}

function brooks_curried<T extends number>(items: [Curry, Pairs<T>]): Curry {
  return brooks(head(items), tail(items))
}

test('2.21', () => {
  expect(brooks(plus_curried, list(3, 4))).toEqual(7)
  expect(brooks_curried(list(plus_curried, 3, 4))).toEqual(7)
  expect(brooks(plus_curried, list(3, 4))).toEqual(brooks_curried(list(plus_curried, 3, 4)))
})
