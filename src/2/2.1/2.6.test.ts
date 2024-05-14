type ChurchNumber<T extends number> = (f: (x: T) => T) => (x: T) => T

type UnaryFunction<T> = (x: T) => T

const one: <T>(f: UnaryFunction<T>) => UnaryFunction<T> = (f) => (x) => f(x)

const two: <T>(f: UnaryFunction<T>) => UnaryFunction<T> = (f) => (x) => f(f(x))

function plus<T extends number>(n: ChurchNumber<T>, m: ChurchNumber<T>): ChurchNumber<T> {
  return (f) => (x) => n(f)(m(f)(x))
}

function church_to_number<T extends number>(c: ChurchNumber<T>): T {
  return c((n) => (n + 1) as T)(0 as T)
}

test('2.6', () => {
  const three: ChurchNumber<number> = plus(one, two)

  expect(church_to_number(three)).toEqual(3)
})
