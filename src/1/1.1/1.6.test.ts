import { average, abs, square } from '../../../utils'

describe('1.6', () => {
  let recursive_counter = 0

  function conditional(predicate: boolean, then_clause: number, else_clause: number): number {
    return predicate ? then_clause : else_clause
  }

  function is_good_enough(guess: number, x: number): boolean {
    return abs(square(guess) - x) < 0.001
  }

  function improve(guess: number, x: number): number {
    return average(guess, x / guess)
  }

  function sqrt_iter(guess: number, x: number): number {
    recursive_counter += 1
    if (recursive_counter > 10) throw new Error('encountered infinite loop')
    return conditional(is_good_enough(guess, x), guess, sqrt_iter(improve(guess, x), x))
  }

  test('should end in an infinite loop', () => {
    expect(() => {
      sqrt_iter(3, 25)
    }).toThrow('encountered infinite loop')
  })
})
