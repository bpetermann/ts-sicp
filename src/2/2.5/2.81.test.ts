import {
  list,
  pair,
  head,
  error,
  tail,
  math_sqrt,
  math_cos,
  math_sin,
  is_undefined,
  is_null,
  equal,
  map,
  math_atan2,
  length,
  apply_in_underlying_javascript
} from 'sicp'
import { square } from '../../../utils'
import {
  attach_tag,
  put,
  type_tag,
  contents,
  List,
  install_rectangular_package,
  get,
  ListNode,
  Dispatch
} from '../2.4/2.75.test'

install_rectangular_package()
install_polar_package()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function apply(fun: any, args: List): List {
  return apply_in_underlying_javascript(fun, args)
}

function install_javascript_number_package() {
  function tag(x: number): List {
    return attach_tag('javascript_number', x)
  }
  put('add', list('javascript_number', 'javascript_number'), (x: number, y: number) => tag(x + y))
  put('sub', list('javascript_number', 'javascript_number'), (x: number, y: number) => tag(x - y))
  put('mul', list('javascript_number', 'javascript_number'), (x: number, y: number) => tag(x * y))
  put('div', list('javascript_number', 'javascript_number'), (x: number, y: number) => tag(x / y))
  put('make', 'javascript_number', (x: number) => tag(x))
  return 'done'
}
install_javascript_number_package()

function make_javascript_number(n: number) {
  return (get('make', 'javascript_number') as (x: number) => List)(n)
}

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

function real_part(z: List) {
  return apply_generic('real_part', list(z)) as number
}
function imag_part(z: List) {
  return apply_generic('imag_part', list(z)) as number
}
function magnitude(z: List) {
  return apply_generic('magnitude', list(z)) as number
}
function angle(z: List) {
  return apply_generic('angle', list(z)) as number
}

function install_complex_package() {
  function make_from_real_imag(x: number, y: number) {
    return (get('make_from_real_imag', 'rectangular') as (x: number, y: number) => List)(x, y)
  }
  function make_from_mag_ang(r: number, a: number) {
    return (get('make_from_mag_ang', 'polar') as (r: number, a: number) => List)(r, a)
  }

  function add_complex(z1: List, z2: List) {
    return make_from_real_imag(real_part(z1) + real_part(z2), imag_part(z1) + imag_part(z2))
  }
  function sub_complex(z1: List, z2: List) {
    return make_from_real_imag(real_part(z1) - real_part(z2), imag_part(z1) - imag_part(z2))
  }
  function mul_complex(z1: List, z2: List) {
    return make_from_mag_ang(magnitude(z1) * magnitude(z2), angle(z1) + angle(z2))
  }
  function div_complex(z1: List, z2: List) {
    return make_from_mag_ang(magnitude(z1) / magnitude(z2), angle(z1) - angle(z2))
  }

  function tag(z: List): List {
    return attach_tag('complex', z)
  }
  put('add', list('complex', 'complex'), (z1: List, z2: List) => tag(add_complex(z1, z2)))
  put('sub', list('complex', 'complex'), (z1: List, z2: List) => tag(sub_complex(z1, z2)))
  put('mul', list('complex', 'complex'), (z1: List, z2: List) => tag(mul_complex(z1, z2)))
  put('div', list('complex', 'complex'), (z1: List, z2: List) => tag(div_complex(z1, z2)))
  put('make_from_real_imag', 'complex', (x: number, y: number) => tag(make_from_real_imag(x, y)))
  put('make_from_mag_ang', 'complex', (r: number, a: number) => tag(make_from_mag_ang(r, a)))
  return 'done'
}
install_complex_package()

function make_complex_from_real_imag(x: number, y: number) {
  return (get('make_from_real_imag', 'complex') as (x: number, y: number) => List)(x, y)
}

let coercion_list: null | List = null

export function clear_coercion_list() {
  coercion_list = null
}

function put_coercion(type1: string, type2: string, item: (y: List) => List) {
  if (is_undefined(get_coercion(type1, type2))) {
    coercion_list = pair(list(type1, type2, item), coercion_list)
  } else {
    return coercion_list
  }
}

function get_coercion(type1: string, type2: string) {
  function get_type1(list_item: List): string {
    return head(list_item) as string
  }
  function get_type2(list_item: List) {
    return head(tail(list_item) as List)
  }
  function get_item(list_item: List) {
    return head(tail(tail(list_item) as List) as List)
  }
  function get_coercion_iter(items: null | List): ListNode | undefined {
    if (is_null(items)) {
      return undefined
    } else {
      const top = head(items as List)
      return equal(type1, get_type1(top as List)) && equal(type2, get_type2(top as List))
        ? get_item(top as List)
        : get_coercion_iter(tail(items as List) as List)
    }
  }
  return get_coercion_iter(coercion_list)
}

function apply_generic(op: string, args: List): ListNode | void {
  const type_tags = map(type_tag as (x: List) => List, args as never)
  const fun = get(op, type_tags)
  if (!is_undefined(fun)) {
    return apply(fun, map(contents as (x: List) => List, args as never))
  } else {
    if (length(args) === 2) {
      const type1 = head(type_tags) as string
      const type2 = head(tail(type_tags) as List) as string
      const a1 = head(args) as string
      const a2 = head(tail(args) as List) as string
      const t1_to_t2 = get_coercion(type1, type2) as Dispatch
      const t2_to_t1 = get_coercion(type2, type1) as Dispatch
      return !is_undefined(t1_to_t2)
        ? apply_generic(op, list(t1_to_t2(a1) as ListNode, a2))
        : !is_undefined(t2_to_t1)
          ? apply_generic(op, list(a1, t2_to_t1(a2) as ListNode))
          : error(list(op, type_tags), 'no method for these types')
    } else {
      return error(list(op, type_tags), 'no method for these types')
    }
  }
}

function javascript_number_to_complex(n: List): List {
  return make_complex_from_real_imag(contents(n) as number, 0)
}

put_coercion('javascript_number', 'complex', javascript_number_to_complex)

const c = make_complex_from_real_imag(4, 3)
const n = make_javascript_number(7)

function add(x: List, y: List) {
  return apply_generic('add', list(x, y))
}

test('2.81', () => {
  expect(add(c, n)).toEqual(['complex', ['rectangular', [11, 3]]])
})
