/* eslint-disable @typescript-eslint/no-explicit-any */
import { head, list, tail, length } from 'sicp'

function last_pair<T>(items: [T, any]): number {
  return length(items) === 1 ? (head(items) as number) : last_pair(tail(items))
}

test('2.6', () => {
  expect(last_pair(list(23, 72, 149, 34))).toEqual(34)
})
