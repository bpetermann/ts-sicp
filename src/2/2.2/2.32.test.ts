import { append, head, is_null, list, map, tail } from 'sicp'
import { List } from './2.17.test'

function subsets(s: List): List {
  if (is_null(s)) {
    return list(null)
  } else {
    const rest = subsets(tail(s) as List)
    return append(
      rest,
      map((x) => list(head(s), x), rest as never)
    )
  }
}

test('2.30', () => {
  expect(subsets(list(1, 2, 3))).toEqual([
    null,
    [
      [3, [null, null]],
      [
        [2, [null, null]],
        [
          [2, [[3, [null, null]], null]],
          [
            [1, [null, null]],
            [
              [1, [[3, [null, null]], null]],
              [
                [1, [[2, [null, null]], null]],
                [[1, [[2, [[3, [null, null]], null]], null]], null]
              ]
            ]
          ]
        ]
      ]
    ]
  ])
})
