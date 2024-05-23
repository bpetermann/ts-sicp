import { list } from 'sicp'
import { List } from './2.17.test'
import { accumulate } from './2.33.test'

const sum = (a: number, b: number): number => a + b

function horner_eval(x: number, coefficient_sequence: List): number {
  return accumulate((this_coeff, higher_terms) => sum(x * higher_terms, this_coeff), 0, coefficient_sequence)
}

describe('2.34', () => {
  expect(horner_eval(2, list(1, 3, 0, 5, 0, 1))).toEqual(79)
})
