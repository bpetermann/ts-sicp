import { head, is_null, is_pair, list, tail } from 'sicp'
import { List, as_list } from '../2.2/2.17.test'

export function equal(a: List, b: List): boolean {
  return is_null(tail(a)) && is_null(tail(b))
    ? true
    : !is_pair(head(a)) && !is_pair(head(b)) && head(a) !== head(b)
      ? false
      : equal(as_list(tail(a)), as_list(tail(b)))
}

describe('2.54', () => {
  test('1', () => {
    expect(equal(list('this', 'is', 'a', 'list'), list('this', 'is', 'a', 'list'))).toBe(true)
    expect(equal(list('this', 'is', 'a', 'list'), list('this', list('is', 'a'), 'list'))).toBe(false)
    expect(equal(list('this', list('is', 'a'), 'list'), list('this', list('is', 'a'), 'list'))).toBe(true)
  })
})
