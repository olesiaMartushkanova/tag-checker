import {
  cleanTerminatedTags,
  isClosingTag,
  isSameTag,
  splitTagsInHalf,
  stripTag,
} from './utils';

export const tagChecker = (html: string) => {
  const messedUpTags = cleanTerminatedTags(html);

  if (messedUpTags) {
    const { leftTags, rightTags } = splitTagsInHalf(messedUpTags);

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
