import { list, append, pair } from 'sicp'

const x = list(1, 2, 3)
const y = list(4, 5, 6)

describe('2.26', () => {
  test('the result of evaluating append(x, y)', () => {
    expect(append(x, y)).toEqual([1, [2, [3, [4, [5, [6, null]]]]]])
  })

  test('the result of evaluating pair(x, y)', () => {
    expect(pair(x, y)).toEqual([
      [1, [2, [3, null]]],
      [4, [5, [6, null]]]
    ])
  })

  test('the result of evaluating list(x, y)', () => {
    expect(list(x, y)).toEqual([
      [1, [2, [3, null]]],
      [[4, [5, [6, null]]], null]
    ])
  })
})
