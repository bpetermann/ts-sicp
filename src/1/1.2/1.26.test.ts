import { is_even, square } from '../../../utils'

test('1.26', () => {
  let expmod_1_counter = 0
  let expmod_2_counter = 0

  function expmod_1(base: number, exp: number, m: number): number {
    expmod_1_counter += 1
    return exp === 0
      ? 1
      : is_even(exp)
        ? square(expmod_1(base, exp / 2, m)) % m
        : (base * expmod_1(base, exp - 1, m)) % m
  }

  function expmod_2(base: number, exp: number, m: number): number {
    expmod_2_counter += 1
    return exp === 0
      ? 1
      : is_even(exp)
        ? (expmod_2(base, exp / 2, m) * expmod_2(base, exp / 2, m)) % m
        : (base * expmod_2(base, exp - 1, m)) % m
  }

  expmod_1(4, 3, 5)
  expmod_2(4, 3, 5)

  expect(expmod_1_counter).toBeLessThan(expmod_2_counter)
})
