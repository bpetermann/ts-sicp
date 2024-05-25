import { list, head, tail } from 'sicp'

describe('2.25', () => {
  it('should pick 7 from the following lists', () => {
    expect(head(tail(head(tail(tail(list(1, 3, list(5, 7), 9))))))).toEqual(7)
  })

  it('should pick 7 from the following lists', () => {
    expect(head(head(list(list(7))))).toEqual(7)
  })

  it('should pick 7 from the following lists', () => {
    expect(
      head(
        tail(
          head(
            tail(
              head(tail(head(tail(head(tail(head(tail(list(1, list(2, list(3, list(4, list(5, list(6, 7))))))))))))))
            )
          )
        )
      )
    ).toEqual(7)
  })
})
