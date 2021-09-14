/* eslint-disable no-undef */

describe('First', () => {
  it('Deve somar 2 + 2 e retornar 4', () => {
    expect(2 + 2).toBe(4);
  });

  it('Deve somar 2 + 2 e não retornar 5', () => {
    expect(2 + 2).not.toBe(5);
  });
});
