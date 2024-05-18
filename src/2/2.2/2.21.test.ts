import { list, head, tail, is_null } from 'sicp'

type Curry = (x: number) => number | Curry
type Nested<T> = [T, Nested<T> | null]

function plus_curried(x: number): (y: number) => number {
  return (y) => x + y
}

function brooks(f: Curry, items: Nested<number>): Curry {
  return is_null(items) ? f : brooks(f(head(items)) as Curry, tail(items as Extract<Nested<number>, null>))
}

function brooks_curried(items: [Curry, Nested<number>]): Curry {
  return brooks(head(items), tail(items) as Nested<number>)
}

test('2.6', () => {
  expect(brooks_curried(list(plus_curried, 3, 4))).toEqual(7)
})
