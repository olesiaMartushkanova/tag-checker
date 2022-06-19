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
])('isSameTag', (leftTag, rightTag, expected) => {
  it(`returns ${expected} if leftTag is ${leftTag} and rightTag is${rightTag}`, () => {
    const result = isSameTag(leftTag, rightTag);

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
    const expectedRightTags = ['<B>', '</B>'];
    const expectedLeftTags = ['<A>', '</A>'];
    const { rightTags, leftTags } = splitTagsArrInHalf(tags);

    expect(rightTags).toEqual(expect.arrayContaining(expectedRightTags));
    expect(leftTags).toEqual(expect.arrayContaining(expectedLeftTags));
  });
});

describe('cleanTerminatedTags', () => {
  it('cleans terminated tags correctly', () => {
    const html = 'The following text<C><B>is centred and in boldface</B></C>';

    const expectedRightTags = ['<C>', '</C>'];

    const result = cleanTerminatedTags(html);
    expect(result).toEqual(expect.arrayContaining(expectedRightTags));
  });
});
