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
    const { openingTags, closingTags } = splitTagsArrInHalf(mixedTags);

    for (let i = 0; i < Math.max(openingTags.length, closingTags.length); i++) {
      const openingTag = openingTags?.[i];
      const closingTag = closingTags?.[i];

      if (!openingTag && closingTag) {
        console.log(`Expected # found ${closingTag}`);
        return;
      }

      if (openingTag && !closingTag) {
        console.log(`Expected </${stripTag(openingTag)}> found #`);
        return;
      }

      if (isSameTag(openingTag, closingTag)) {
        if (isClosingTag(openingTag)) {
          console.log(`Expected <${stripTag(openingTag)}> found ${openingTag}`);
          return;
        }

        if (!isClosingTag(closingTag)) {
          console.log(
            `Expected </${stripTag(closingTag)}> found ${closingTag}`,
          );
          return;
        }
      }

      if (!isSameTag(openingTag, closingTag)) {
        console.log(`Expected </${stripTag(openingTag)}> found ${closingTag}`);
        return;
      }
    }
    console.log('Correctly tagged paragraph');
  }
};
