import { cube } from '../../../utils'

function inc(k: number): number {
  return k + 1
}

function sum(term: (x: number) => number, a: number, next: (x: number) => number, b: number): number {
  return a > b ? 0 : term(a) + sum(term, next(a), next, b)
}

function simpsons_rule_integral(f: (x: number) => number, a: number, b: number, n: number): number {
  function helper(h: number): number {
    function y(k: number): number {
      return f(k * h + a)
    }

    function term(k: number): number {
      return k === 0 || k === n ? y(k) : k % 2 === 0 ? 2 * y(k) : 4 * y(k)
    }

    return sum(term, 0, inc, n) * (h / 3)
  }
  return helper((b - a) / n)
}

test('1.29', () => {
  expect(simpsons_rule_integral(cube, 0, 1, 100)).toEqual(0.24999999999999992)
})
