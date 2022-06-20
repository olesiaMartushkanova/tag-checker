import {
  isClosingTag,
  isSameTag,
  stripTag,
  splitTagsArrInHalf,
  cleanTerminatedTags,
} from '../src/utils';

describe.each([
  ['<A>', '</A>', true],
  ['<A>', '</C>', false],
])('isSameTag', (openingTag, closingTag, expected) => {
  it(`returns ${expected} if openingTag is ${openingTag} and closingTag is${closingTag}`, () => {
    const result = isSameTag(openingTag, closingTag);

    expect(result).toBe(expected);
  });
});

describe.each([
  ['<A>', 'A'],
  ['</A>', 'A'],
])('stripTag', (tag, expected) => {
  it(`returns ${expected} if tag is ${tag}`, () => {
    const result = stripTag(tag);

    expect(result).toBe(expected);
  });
});

describe.each([
  ['<A>', false],
  ['</A>', true],
])('isClosingTag', (tag, expected) => {
  it(`returns ${expected} if tag is ${tag}`, () => {
    const result = isClosingTag(tag);

    expect(result).toBe(expected);
  });
});

describe('splitTagsArrInHalf', () => {
  it('splits array of tags in half correctly', () => {
    const tags = ['<A>', '</A>', '<B>', '</B>'];
    const expectedclosingTags = ['<B>', '</B>'];
    const expectedopeningTags = ['<A>', '</A>'];
    const { closingTags, openingTags } = splitTagsArrInHalf(tags);

    expect(closingTags).toEqual(expect.arrayContaining(expectedclosingTags));
    expect(openingTags).toEqual(expect.arrayContaining(expectedopeningTags));
  });
});

describe('cleanTerminatedTags', () => {
  it('cleans terminated tags correctly', () => {
    const html = 'The following text<C><B>is centred and in boldface</B></C>';

    const expectedclosingTags = ['<C>', '</C>'];

    const result = cleanTerminatedTags(html);
    expect(result).toEqual(expect.arrayContaining(expectedclosingTags));
  });
});
