import { inc } from '../../../utils'

function dec(x: number): number {
  return x - 1
}

test('1.9', () => {
  function recursive_plus(a: number, b: number): number {
    return a === 0 ? b : inc(recursive_plus(dec(a), b))
  }
  function iterative_plus(a: number, b: number): number {
    return a === 0 ? b : iterative_plus(dec(a), inc(b))
  }

  expect(recursive_plus(5, 8)).toEqual(iterative_plus(5, 8))
})
