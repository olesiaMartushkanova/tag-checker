import { tagChecker } from './tagChecker';

describe.each([
  ['<A></A><B></B>', 'Correctly tagged paragraph'],
  ['<A><B><C></C></B></A>', 'Correctly tagged paragraph'],
  [
    'The following text<C><B>is centred and in boldface</B></C>',
    'Correctly tagged paragraph',
  ],
  [
    '<B>This <g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence',
    'Correctly tagged paragraph',
  ],
  [
    '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>',
    'Expected </C> found </B>',
  ],
  [
    '<B>This should be in boldface, but there is an extra closing tag</B></C>',
    'Expected # found </C>',
  ],
  [
    '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>',
    'Expected </B> found #',
  ],
])('tagChecker', (input, expectedLogMessage) => {
  it('returns correct message', () => {
    console.log = jest.fn();

    tagChecker(input);
    expect(console.log).toHaveBeenCalledWith(expectedLogMessage);
  });
});
