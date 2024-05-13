/* eslint-disable @typescript-eslint/no-explicit-any */
import { cube } from '../../../utils'

test('1.42', () => {
  type UnaryFunction = (x: number) => number

  function compose<T extends UnaryFunction>(f: T, g: T): UnaryFunction {
    return (x: number) => f(g(x))
  }

  function repeated<T extends UnaryFunction>(f: T, n: number): UnaryFunction {
    return n === 0 ? (x: number) => x : compose(f, repeated(f, n - 1))
  }

  function smooth(f: UnaryFunction): UnaryFunction {
    const dx = 0.00001
    return (x: number) => (f(x - dx) + f(x) + f(x + dx)) / 3
  }

  function n_fold_smooth(f: UnaryFunction, n: number) {
    return repeated(smooth(f), n)
  }

  console.log(n_fold_smooth(cube, 5)(4)) // Output: 64
})
