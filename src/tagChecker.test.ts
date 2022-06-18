import { tagChecker } from './tagChecker';

describe('tagChecker', () => {
  it('wrong mixed tag', () => {
    const actual = tagChecker('<A></A><B></B>');
    expect(actual).toBe(false);
  });
});
