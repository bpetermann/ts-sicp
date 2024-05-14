import { head, pair, tail } from 'sicp'
import { Point, Segment, end_segment, make_point, make_segment, start_segment, x_point, y_point } from './2.2.test'

function make_rectangle(start: Point, end: Point): Segment {
  return pair(start, end)
}

function make_rectangle_2(s: Segment): Segment {
  return pair(start_segment(s), end_segment(s))
}

function start_rectangle(s: Segment): Point {
  return head(s)
}

function end_rectangle(s: Segment): Point {
  return tail(s)
}

function width_rect(r: Segment): number {
  return x_point(end_rectangle(r)) - x_point(start_rectangle(r))
}

function height_rec(r: Segment): number {
  return y_point(end_rectangle(r)) - y_point(start_rectangle(r))
}

function perimeter_rec(rec: Segment): number {
  return 2 * width_rect(rec) + 2 * height_rec(rec)
}

function area_rect(rec: Segment): number {
  return width_rect(rec) + height_rec(rec)
}
describe('2.3', () => {
  test('rectangle perimeter and area functions', () => {
    const start = make_point(1, 1)
    const end = make_point(3, 3)
    const rectangle = make_rectangle(start, end)

    expect(perimeter_rec(rectangle)).toEqual(8)
    expect(area_rect(rectangle)).toEqual(4)
  })

  test('different rectangle implementation', () => {
    const start = make_point(1, 1)
    const end = make_point(3, 3)
    const rectangle = make_rectangle(start, end)
    const rectangle_2 = make_rectangle_2(make_segment(start, end))

    expect(perimeter_rec(rectangle)).toEqual(perimeter_rec(rectangle_2))
    expect(area_rect(rectangle)).toEqual(area_rect(rectangle_2))
  })
})
