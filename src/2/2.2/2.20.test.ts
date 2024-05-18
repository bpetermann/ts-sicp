import { list, head, tail, is_null } from 'sicp'

type Curry = (x: number) => number | Curry
type Nested<T> = [T, Nested<T> | null]

function plus_curried(x: number): (y: number) => number {
  return (y) => x + y
}

function brooks<T extends number>(f: Curry, items: Nested<T>): Curry {
  return is_null(items) ? f : brooks(f(head(items)) as Curry, tail(items as Extract<Nested<T>, null>))
}

test('2.6', () => {
  expect(brooks(plus_curried, list(3, 4))).toEqual(7)
})
