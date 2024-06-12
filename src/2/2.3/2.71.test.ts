import { list, length } from 'sicp'
import { generate_huffman_tree } from './2.69.test'
import { encode } from './2.70.test'

describe('2.71', () => {
  const sample_frequencies = list(list('A', 16), list('B', 8), list('C', 4), list('D', 2), list('E', 1))

  const tree = generate_huffman_tree(sample_frequencies)

  expect(length(encode(list('A'), tree))).toEqual(1)
  expect(length(encode(list('E'), tree))).toEqual(4)
})
