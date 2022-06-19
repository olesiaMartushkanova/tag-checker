import {
  cleanTerminatedTags,
  isClosingTag,
  isSameTag,
  splitTagsArrInHalf,
  stripTag,
} from './utils';

export const tagChecker = (html: string) => {
  const mixedTags = cleanTerminatedTags(html);

  if (mixedTags) {
    const { leftTags, rightTags } = splitTagsArrInHalf(mixedTags);

    for (let i = 0; i < Math.max(leftTags.length, rightTags.length); i++) {
      const leftTag = leftTags?.[i];
      const rightTag = rightTags?.[i];

      if (!leftTag && rightTag) {
        console.log(`Expected # found ${rightTag}`);
        return;
      }

      if (leftTag && !rightTag) {
        console.log(`Expected </${stripTag(leftTag)}> found #`);
        return;
      }

      if (isSameTag(leftTag, rightTag) && isClosingTag(leftTag)) {
        console.log(`Expected <${stripTag(leftTag)}> found ${leftTag}`);
        return;
      }

      if (isSameTag(leftTag, rightTag) && !isClosingTag(rightTag)) {
        console.log(`Expected </${stripTag(rightTag)}> found ${rightTag}`);
        return;
      }

      if (!isSameTag(leftTag, rightTag)) {
        console.log(`Expected </${stripTag(leftTag)}> found ${rightTag}`);
        return;
      }
    }
    console.log('Correctly tagged paragraph');
  }
};
