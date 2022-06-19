export const stripTag = (tag: string) => tag?.replaceAll(/[<>\\/]/g, '');

export const isSameTag = (leftTag: string, rightTag: string) =>
  stripTag(leftTag) === stripTag(rightTag);

export const isClosingTag = (tag: string) => tag.includes('/');

export const splitTagsInHalf = (tags: string[]) => {
  const closingTagCount = tags.filter(isClosingTag).length;
  const middle = tags.length / 2;
  const half =
    closingTagCount > middle ? Math.floor(middle) : Math.ceil(middle);
  const leftTags = tags.slice(0, half).reverse();
  const rightTags = tags.slice(half);

  return { leftTags, rightTags };
};

export const cleanTerminatedTags = (html: string) => {
  const tagsRegexp = /<\/??[A-Z]{1}>/g;
  const tags = html.match(tagsRegexp);

  if (tags) {
    let tagsStr = tags.join();

    const openCloseTagPair = tagsStr.match(/(<[A-Z]{1}>),(<\/[A-Z]{1}>)/g);

    openCloseTagPair?.forEach((tagsPair) => {
      const tagPairArr = tagsPair.split(',');

      if (isSameTag(tagPairArr?.[0], tagPairArr?.[1])) {
        tagsStr = tagsStr.replace(tagsPair, '');
      }
    });

    return tagsStr.match(tagsRegexp) || [];
  }
  return null;
};
