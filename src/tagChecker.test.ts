import { check } from './tagChecker';

describe('tagChecker', () => {
  it('wrong mixed tag', () => {
    const actual = check('<A></A><B></B>');
    expect(actual).toBe(false);
  });
});
