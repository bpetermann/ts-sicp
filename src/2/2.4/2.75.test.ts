import {
  math_sqrt,
  error,
  head,
  list,
  is_null,
  equal,
  tail,
  is_undefined,
  set_tail,
  pair,
  is_pair,
  math_atan2,
  math_sin,
  math_cos
} from 'sicp'
import { square } from '../../../utils'

type Dispatch = (op: string) => number | void
type ListNode = number | null | List | string | Dispatch
type List = [ListNode, ListNode]

function make_from_real_imag(x: number, y: number): Dispatch {
  function dispatch(op: string) {
    return op === 'real_part'
      ? x
      : op === 'imag_part'
        ? y
        : op === 'magnitude'
          ? math_sqrt(square(x) + square(y))
          : op === 'angle'
            ? math_atan2(y, x)
            : error(op, 'unknown op -- make_from_real_imag')
  }
  return dispatch
}

function make_from_mag_ang(r: number, a: number): Dispatch {
  function dispatch(op: string) {
    return op === 'real_part'
      ? r * math_cos(a)
      : op === 'imag_part'
        ? r * math_sin(a)
        : op === 'magnitude'
          ? r
          : op === 'angle'
            ? a
            : error(op, 'unknown op -- make_from_real_imag')
  }
  return dispatch
}

function apply_generic(op: string, arg: List): number {
  return (head(arg) as Dispatch)(op) as number
}
function real_part(z: Dispatch) {
  return apply_generic('real_part', list(z))
}
function imag_part(z: Dispatch) {
  return apply_generic('imag_part', list(z))
}

function add_complex(z1: Dispatch, z2: Dispatch) {
  return make_from_real_imag(real_part(z1) + real_part(z2), imag_part(z1) + imag_part(z2))
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

const operation_table = make_table()
const put = operation_table('insert') as (
  key_1: string,
  key_2: ListNode,
  value: ((z: List) => number) | ((r: number, a: number) => List) | ((x: List, y: List) => List)
) => void

function attach_tag(type_tag: string, contents: ListNode): List {
  return pair(type_tag, contents)
}

export function type_tag(datum: List): string | void {
  return is_pair(datum) ? (head(datum) as string) : error(datum, 'bad tagged datum -- type_tag')
}

export function contents(datum: List): List | void {
  return is_pair(datum) ? (tail(datum) as List) : error(datum, 'bad tagged datum -- contents')
}

function install_rectangular_package() {
  function real_part(z: List): number {
    return head(z) as number
  }
  function imag_part(z: List): number {
    return tail(z) as number
  }
  function make_from_real_imag(x: List, y: List): List {
    return pair(x, y)
  }
  function magnitude(z: List): number {
    return math_sqrt(square(real_part(z)) + square(imag_part(z)))
  }
  function angle(z: List): number {
    return math_atan2(imag_part(z), real_part(z))
  }
  function make_from_mag_ang(r: number, a: number): List {
    return pair(r * math_cos(a), r * math_sin(a))
  }
  function tag(x: List): List {
    return attach_tag('rectangular', x)
  }
  put('real_part', list('rectangular'), real_part)
  put('imag_part', list('rectangular'), imag_part)
  put('magnitude', list('rectangular'), magnitude)
  put('angle', list('rectangular'), angle)
  put('make_from_real_imag', 'rectangular', (x: List, y: List) => tag(make_from_real_imag(x, y)))
  put('make_from_mag_ang', 'rectangular', (r: number, a: number) => tag(make_from_mag_ang(r, a)))
  return 'done'
}

install_rectangular_package()
function install_polar_package() {
  function magnitude(z: List): number {
    return head(z) as number
  }
  function angle(z: List): number {
    return tail(z) as number
  }
  function make_from_mag_ang(r: number, a: number): List {
    return pair(r, a)
  }
  function real_part(z: List): number {
    return magnitude(z) * math_cos(angle(z))
  }
  function imag_part(z: List): number {
    return magnitude(z) * math_sin(angle(z))
  }
  function make_from_real_imag(x: number, y: number): List {
    return pair(math_sqrt(square(x) + square(y)), math_atan2(y, x))
  }

  function tag(x: List): List {
    return attach_tag('polar', x)
  }
  put('real_part', list('polar'), real_part)
  put('imag_part', list('polar'), imag_part)
  put('magnitude', list('polar'), magnitude)
  put('angle', list('polar'), angle)
  put('make_from_real_imag', 'polar', (x: number, y: number) => tag(make_from_real_imag(x, y)))
  put('make_from_mag_ang', 'polar', (r: number, a: number) => tag(make_from_mag_ang(r, a)))
  return 'done'
}

install_polar_package()

test('2.73', () => {
  const my_complex_number = make_from_mag_ang(4.0, 0.5)

  const result = add_complex(my_complex_number, my_complex_number)

  expect(real_part(result)).toBeCloseTo(7.02066)
})
