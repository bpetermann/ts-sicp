import { error, list, is_null, head, tail, pair, is_undefined, set_tail, equal, is_string, is_number } from 'sicp'
import { List, ListNode } from '../2.2/2.17.test'

function is_variable(x: unknown): x is string {
  return is_string(x)
}

function is_same_variable(v1: unknown, v2: unknown): boolean {
  return is_variable(v1) && is_variable(v2) && v1 === v2
}

function deriv(exp: ListNode, variable: string) {
  return is_number(exp)
    ? 0
    : is_variable(exp)
      ? is_same_variable(exp, variable)
        ? 1
        : 0
      : get('deriv', operator(exp as List))(operands(exp as List), variable)
}

function operator(exp: List): ListNode {
  return head(exp) as List
}

function operands(exp: List): List {
  return tail(exp) as List
}

function make_sum(a1: ListNode, a2: ListNode): List {
  return list('+', a1, a2)
}

function make_product(m1: ListNode, m2: ListNode): List {
  return list('*', m1, m2)
}

export function addend(operands: List): ListNode {
  return head(operands)
}

export function augend(operands: List): ListNode {
  return head(tail(operands as List) as List)
}

function multiplier(operands: List): ListNode {
  return head(operands)
}

function multiplicand(operands: List): ListNode {
  return head(tail(operands as List) as List)
}

function assoc(key: ListNode, records: List): ListNode | undefined {
  return is_null(records)
    ? undefined
    : equal(key, head(head(records) as List) as string)
      ? head(records)
      : assoc(key, tail(records) as List)
}

export function make_table() {
  const local_table = list('*table*')
  function lookup(key_1: string, key_2: string) {
    const subtable = assoc(key_1, tail(local_table) as unknown as List)
    if (is_undefined(subtable)) {
      return undefined
    } else {
      const record = assoc(key_2, tail(subtable as List) as List)
      return is_undefined(record) ? undefined : tail(record as List)
    }
  }
  function insert<T>(key_1: string, key_2: string, value: (x: T) => T) {
    const subtable = assoc(key_1, tail(local_table) as unknown as List)
    if (is_undefined(subtable)) {
      set_tail(local_table, pair(list(key_1, pair(key_2, value)), tail(local_table)))
    } else {
      const record = assoc(key_2, tail(subtable as List) as List)
      if (is_undefined(record)) {
        set_tail(subtable as List, pair(pair(key_2, value), tail(subtable as List)))
      } else {
        set_tail(record as List, value)
      }
    }
  }
  function dispatch(m: string): typeof insert | typeof lookup | void {
    return m === 'lookup' ? lookup : m === 'insert' ? insert : error(m, 'unknown operation -- table')
  }
  return dispatch
}

export type GET = (key_1: string, key_2: ListNode) => (operands: List, variable: string) => List
export type PUT = <T>(key_1: string, key_2: ListNode, value: (x: T, y: string) => T) => void
const operation_table = make_table()
const get = operation_table('lookup') as GET
const put = operation_table('insert') as PUT

function deriv_sum(operands: List, variable: string): List {
  return make_sum(deriv(addend(operands), variable), deriv(augend(operands), variable))
}
function deriv_product(operands: List, variable: string): List {
  return make_sum(
    make_product(multiplier(operands), deriv(multiplicand(operands), variable)),
    make_product(deriv(multiplier(operands), variable), multiplicand(operands))
  )
}
function install_deriv() {
  put('deriv', '+', deriv_sum)
  put('deriv', '*', deriv_product)
  return 'done'
}

install_deriv()

test('2.73', () => {
  const expected = [
    '+',
    [
      [
        '*',
        [
          ['*', ['x', ['y', null]]],
          [['+', [1, [0, null]]], null]
        ]
      ],
      [
        [
          '*',
          [
            [
              '+',
              [
                ['*', ['x', [0, null]]],
                [['*', [1, ['y', null]]], null]
              ]
            ],
            [['+', ['x', [3, null]]], null]
          ]
        ],
        null
      ]
    ]
  ]
  expect(deriv(list('*', list('*', 'x', 'y'), list('+', 'x', 3)), 'x')).toEqual(expected)
})
