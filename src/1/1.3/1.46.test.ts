import { square, abs, average, math_cos } from '../../../utils'

function iterative_improve(
  good_enough: (x: number) => boolean,
  improve: (n: number) => number
): (guess: number) => number {
  function try_it(guess: number): number {
    return good_enough(guess) ? guess : try_it(improve(guess))
  }

  return (guess: number) => try_it(guess)
}

describe('1.46', () => {
  test('Test iterative_improve sqrt', () => {
    function sqrt(x: number): number {
      return iterative_improve(
        (y) => abs(square(y) - x) < 0.001,
        (y) => average(y, x / y)
      )(x)
    }

    expect(sqrt(5)).toBeCloseTo(2.236)
  })

  test('Test iterative_improve fixed_point', () => {
    function fixed_point(f: (n: number) => number, x: number): number {
      return iterative_improve(
        (x) => abs(x - f(x)) < 0.00001,
        (x) => f(x)
      )(x)
    }

    expect(fixed_point(math_cos, 5)).toBeCloseTo(0.739)
  })
})
