import { head, list, tail, is_number } from 'sicp'

type Mobile = [Branch, [Branch, null]]
type Branch = [number, [number | Mobile, null]]

function make_mobile(left: Branch, right: Branch): Mobile {
  return list(left, right)
}
function make_branch(length: number, structure: Mobile | number): Branch {
  return list(length, structure)
}
function left_branch(m: Mobile): Branch {
  return head(m)
}
function right_branch(m: Mobile): Branch {
  return head(tail(m))
}
function branch_length(b: Branch): number {
  return head(b)
}
function branch_structure(b: Branch): number | Mobile {
  return head(tail(b))
}
function is_weight(x: Mobile | number): x is number {
  return is_number(x)
}
function total_weight(x: Mobile | number): number {
  return is_weight(x)
    ? x
    : total_weight(branch_structure(left_branch(x))) + total_weight(branch_structure(right_branch(x)))
}

function is_balanced(x: Mobile | number): boolean {
  return (
    is_weight(x) ||
    (is_balanced(branch_structure(left_branch(x))) &&
      is_balanced(branch_structure(right_branch(x))) &&
      total_weight(branch_structure(left_branch(x))) * branch_length(left_branch(x)) ===
        total_weight(branch_structure(right_branch(x))) * branch_length(right_branch(x)))
  )
}

describe('2.29', () => {
  test('total weight of mobile', () => {
    const m = make_mobile(make_branch(10, make_mobile(make_branch(10, 2), make_branch(4, 5))), make_branch(10, 23))
    expect(total_weight(m)).toEqual(30)
  })
  test('is_balanced function', () => {
    const m = make_mobile(make_branch(20, make_mobile(make_branch(10, 2), make_branch(4, 5))), make_branch(28, 5))
    expect(is_balanced(m)).toBe(true)
  })
})
