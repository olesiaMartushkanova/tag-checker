import { TAG_REGEX } from './regex';

export const validateTagPairMatchMistake = (html: string) => {
  const result = html.match(TAG_REGEX) as string[];
  const middleOfResult = Math.floor(result?.length || 0) / 2;

  const tagNames = getTagNames(result);

  for (let i = 1; i < middleOfResult; i++) {
    const firstMiddleTagIndex = middleOfResult - i;

    const isNestedTagPairCorrect =
      tagNames?.[firstMiddleTagIndex] === tagNames?.[middleOfResult];

    if (!isNestedTagPairCorrect) {
      console.log(
        `Expected </${tagNames?.[firstMiddleTagIndex]}> found </${tagNames[middleOfResult]}>`,
      );
      return;
    } else {
      console.log(`Expected </${tagNames?.[0]}> found #`);
      return;
    }
  }
};

const getTagNames = (tags: string[]) => {
  const reg = new RegExp('(?<tagName>[A-Z])');

  return tags.map((tag) => tag.match(reg)?.groups?.tagName);
};
