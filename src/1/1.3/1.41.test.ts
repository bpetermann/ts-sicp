import { inc } from '../../../utils'

function double<T extends (n: number) => number>(f: T): (x: number) => ReturnType<T> {
  return (x) => f(f(x)) as ReturnType<T>
}

test('1.41', () => {
  expect(double(inc)(2)).toEqual(4)
})
