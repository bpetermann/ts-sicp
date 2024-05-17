/* eslint-disable @typescript-eslint/no-explicit-any */
import { list, head, tail, is_null } from 'sicp'

function plus_curried(x: number): (y: number) => number {
  return (y) => x + y
}

type Curry = (x: number) => ((y: number) => number) | number

function brooks(f: Curry, items: [any, any]): number {
  return is_null(items) ? (f as any as number) : brooks(f(head(items)) as Curry, tail(items))
}

test('2.6', () => {
  expect(brooks(plus_curried, list(3, 4))).toEqual(7)
})
