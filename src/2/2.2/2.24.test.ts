import { list } from 'sicp'

test('2.24', () => {
  expect(list(1, list(2, list(3, 4)))).toEqual([1, [[2, [[3, [4, null]], null]], null]])
})
