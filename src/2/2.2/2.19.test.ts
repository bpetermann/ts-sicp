import { list, is_null, head, tail } from 'sicp'
import { NumList } from './2.17.test'

const us_coins = list(50, 25, 10, 5, 1)
const uk_coins = list(100, 50, 20, 10, 5, 2, 1)

function no_more(coin_values: NumList) {
  return is_null(coin_values)
}

function first_denomination(coin_values: NumList) {
  return head(coin_values)
}

function except_first_denomination(coin_values: NumList) {
  return tail(coin_values)
}

function cc(amount: number, coin_values: NumList): number {
  return amount === 0
    ? 1
    : amount < 0 || no_more(coin_values)
      ? 0
      : cc(amount, except_first_denomination(coin_values) as NumList) +
        cc(amount - first_denomination(coin_values), coin_values)
}

test('2.21', () => {
  expect(cc(100, us_coins)).toEqual(292)
  expect(cc(100, uk_coins)).toEqual(4563)
})
