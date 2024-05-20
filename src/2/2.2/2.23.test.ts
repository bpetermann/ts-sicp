import { head, tail, display, list, length } from 'sicp'
import { NumList } from './2.17.test'

function for_each(f: (x: number) => void, items: NumList): null {
  f(head(items))
  return length(items) === 1 ? null : for_each(f, tail(items) as NumList)
}

describe('2.23', () => {
  let logSpy: jest.SpyInstance | undefined

  beforeEach(() => {
    logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    if (logSpy) logSpy.mockRestore()
  })

  test('for_each function', () => {
    const expected = ['57', '321', '88']

    for_each((x) => display(x), list(57, 321, 88))

    expected.map((number) => {
      expect(logSpy).toHaveBeenCalledWith(number)
    })
  })
})
