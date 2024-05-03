import { square } from '../../../utils'

function square_sum(a: number, b: number): number {
  return square(a) + square(b)
}

function sum_of_larger_squared(x: number, y: number, z: number): number {
  return x > y && y > z ? square_sum(x, y) : x > z && z > y ? square_sum(x, z) : square_sum(y, z)
}

sum_of_larger_squared(1, 2, 3)
describe('1.3', () => {
  test('Sum of largest two squared', () => {
    expect(sum_of_larger_squared(1, 2, 3)).toEqual(13)
    expect(sum_of_larger_squared(1, 1, 1)).toEqual(2)
    expect(sum_of_larger_squared(1, 2, 2)).toEqual(8)
    expect(sum_of_larger_squared(1, 1, 2)).toEqual(5)
    expect(sum_of_larger_squared(1, 4, 3)).toEqual(25)
  })
})
