test('1.1', () => {
  expect(10).toEqual(10);

  expect(5 + 3 + 4).toEqual(12);

  expect(9 - 1).toEqual(8);

  expect(6 / 2).toEqual(3);

  expect(2 * 4 + (4 - 6)).toEqual(6);

  const a = 3;

  const b = a + 1;

  expect(a + b + a * b).toEqual(19);

  expect(a === b).toEqual(false);

  expect(b > a && b < a * b ? b : a).toEqual(4);

  expect((a as any) === 4 ? 6 : b === 4 ? 6 + 7 + a : 26).toEqual(16);

  expect(2 + (b > a ? b : a)).toEqual(6);

  expect((a > b ? a : a < b ? b : -1) * (a + 1)).toEqual(16);
});
