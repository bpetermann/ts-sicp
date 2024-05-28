import { error, head, is_number, is_pair, is_string, list, tail } from 'sicp'
import { List, ListNode, as_list } from '../2.2/2.17.test'

function is_variable(x: unknown): boolean {
  return is_string(x)
}

function is_same_variable(v1: unknown, v2: unknown): boolean {
  return is_variable(v1) && is_variable(v2) && v1 === v2
}

function is_sum(x: List): boolean {
  return is_pair(x) && head(x) === '+'
}

function make_sum(a1: ListNode, a2: ListNode): List {
  return list('+', a1, a2)
}

function make_product(m1: ListNode, m2: ListNode): List {
  return list('*', m1, m2)
}

function addend(s: List): ListNode {
  return head(as_list(tail(s)))
}

function augend(s: List): ListNode {
  return head(as_list(tail(as_list(tail(s)))))
}

function is_product(x: List): boolean {
  return is_pair(x) && head(x) === '*'
}

function multiplier(s: List): ListNode {
  return head(as_list(tail(s)))
}

function multiplicand(s: List): ListNode {
  return head(as_list(tail(as_list(tail(s)))))
}

function number_equal(exp: ListNode, num: ListNode): boolean {
  return is_number(exp) && exp === num
}

function base(e: List): ListNode {
  return head(as_list(tail(e)))
}
function exponent(e: List): ListNode {
  return head(as_list(tail(as_list(tail(e)))))
}
function make_exp(base: ListNode, exp: ListNode): ListNode {
  return number_equal(exp, 0) ? 1 : number_equal(exp, 1) ? base : list('**', base, exp)
}
function is_exp(x: List): boolean {
  return is_pair(x) && head(x) === '**'
}

export function deriv(exp: List, variable: string): ListNode | void {
  return is_number(exp)
    ? 0
    : is_variable(exp)
      ? is_same_variable(exp, variable)
        ? 1
        : 0
      : is_sum(exp)
        ? (make_sum(
            as_list(deriv(as_list(addend(exp)), variable)),
            as_list(deriv(as_list(augend(exp)), variable))
          ) as List)
        : is_product(exp)
          ? (make_sum(
              make_product(multiplier(exp), as_list(deriv(as_list(multiplicand(exp)), variable))),
              make_product(as_list(deriv(as_list(multiplier(exp)), variable)), multiplicand(exp))
            ) as List)
          : is_exp(exp)
            ? make_product(
                make_product(exponent(exp), make_exp(base(exp), (exponent(exp) as number) - 1)),
                as_list(deriv(as_list(base(exp)), variable))
              )
            : error(exp, 'unknown expression type -- deriv')
}

test('2.56', () => {
  expect(deriv(list('**', 'x', 4), 'x')).toEqual([
    '*',
    [
      ['*', [4, [['**', ['x', [3, null]]], null]]],
      [1, null]
    ]
  ])
})
