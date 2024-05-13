import { square, inc } from '../../../utils'

function compose<T extends (n: number) => number>(f: T, g: T): (x: number) => ReturnType<T> {
  return (x: number) => f(g(x)) as ReturnType<T>
}

test('1.42', () => {
  expect(compose(square, inc)(6)).toEqual(49)
})
