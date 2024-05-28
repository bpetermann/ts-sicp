import { is_null, head, tail, list } from 'sicp'
import { List, ListNode, as_list } from '../2.2/2.17.test'

export function member(item: string | number, x: List): ListNode {
  return is_null(x) ? null : item === head(x) ? x : member(item, as_list(tail(x)))
}

describe('2.53', () => {
  test('1', () => {
    expect(list('a', 'b', 'c')).toEqual(['a', ['b', ['c', null]]])
  })
  test('2', () => {
    expect(list(list('george'))).toEqual([['george', null], null])
  })
  test('3', () => {
    expect(tail(list(list('x1', 'x2'), list('y1', 'y2')))).toEqual([['y1', ['y2', null]], null])
  })
  test('4', () => {
    expect(tail(head(list(list('x1', 'x2'), list('y1', 'y2'))))).toEqual(['x2', null])
  })
  test('5', () => {
    expect(member('red', list('blue', 'shoes', 'yellow', 'socks'))).toEqual(null)
  })
  test('5', () => {
    expect(member('red', list('red', 'shoes', 'yellow', 'socks'))).toEqual([
      'red',
      ['shoes', ['yellow', ['socks', null]]]
    ])
  })
})
