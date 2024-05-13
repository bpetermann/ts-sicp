/* eslint-disable @typescript-eslint/no-explicit-any */
import { cube } from '../../../utils'

test('1.42', () => {
  type UnaryFunction = (x: number) => number

  function compose<T extends UnaryFunction>(f: T, g: T): (x: number) => ReturnType<T> {
    return (x: number) => f(g(x)) as ReturnType<T>
  }

  function repeated<T extends (n: any) => any>(
    f: T,
    n: number
  ): ((x: number | UnaryFunction) => any) | ((x: any) => ReturnType<T>) {
    return n === 0 ? (x: number | UnaryFunction) => x : compose(f, repeated(f, n - 1))
  }

  function smooth<T extends UnaryFunction>(f: T): UnaryFunction {
    const dx = 0.00001
    return (x) => (f(x - dx) + f(x) + f(x + dx)) / 3
  }

  function n_fold_smooth(f: UnaryFunction, n: number) {
    return repeated(smooth, n)(f)
  }

  expect(n_fold_smooth(cube, 5)(4)).toBeCloseTo(64)
})
