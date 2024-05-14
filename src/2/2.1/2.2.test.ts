import { display, head, pair, stringify, tail } from 'sicp'
import { average } from '../../../utils'

export type Point = [number, number]

export type Segment = [Point, Point]

export function make_segment(s: Point, e: Point): Segment {
  return pair(s, e)
}

export function start_segment(s: Segment): Point {
  return head(s)
}

export function end_segment(s: Segment): Point {
  return tail(s)
}

export function make_point(x: number, y: number): Point {
  return pair(x, y)
}

export function x_point(p: Point): number {
  return head(p)
}

export function y_point(p: Point): number {
  return tail(p)
}

export function mid_point_segment(s: Segment): Point {
  return make_point(
    average(x_point(start_segment(s)), x_point(end_segment(s))),
    average(y_point(start_segment(s)), y_point(end_segment(s)))
  )
}

function print_point(p: Point): string {
  return display('(' + stringify(x_point(p)) + ', ' + stringify(y_point(p)) + ')')
}

describe('2.2', () => {
  let logSpy: jest.SpyInstance | undefined

  beforeEach(() => {
    logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    if (logSpy) logSpy.mockRestore()
  })

  test('mathematical operations', () => {
    const input = make_segment(make_point(0, 0), make_point(1, 1))
    const expected = '"(0.5, 0.5)"'

    print_point(mid_point_segment(input))
    expect(logSpy).toHaveBeenCalledWith(expected)
  })
})
