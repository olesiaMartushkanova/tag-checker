import {
  CORRECT_HTML_TAG_REGEX,
  MISSING_OPENING_TAG_REGEX,
  CONTAINS_TAGS_REGEX,
  MISSING_CLOSING_TAG_REGEX,
} from './regex';
import { validateTagPairMatchMistake } from './utils';

export const tagChecker = (html: string) => {
  const matchCorrect = html.match(CORRECT_HTML_TAG_REGEX);
  const matchesMissingOpeningTag = html.match(MISSING_OPENING_TAG_REGEX);
  const matchesMissingClosingTag = html.match(MISSING_CLOSING_TAG_REGEX);
  const nestedBetweenTags = matchCorrect?.groups?.children;

  if (matchCorrect) {
    const isTagPairWrong =
      matchCorrect?.groups?.openingTag !== matchCorrect?.groups?.closingTag;
    const isNoTags =
      !nestedBetweenTags ||
      !CONTAINS_TAGS_REGEX.test(nestedBetweenTags as string);

    if (isTagPairWrong) {
      validateTagPairMatchMistake(html);
    }

    if (!isTagPairWrong && isNoTags) {
      console.log('Correctly tagged paragraph');
      return;
    }

    if (!isTagPairWrong && !isNoTags && nestedBetweenTags) {
      tagChecker(nestedBetweenTags);
    }
  }

  if (!matchCorrect) {
    if (matchesMissingOpeningTag) {
      console.log(
        `Expected # found </${matchesMissingOpeningTag?.groups?.closingTag}>`,
      );
      return;
    }

    if (matchesMissingClosingTag) {
      console.log(
        `Expected </${matchesMissingClosingTag?.groups?.openingTag}> found #`,
      );
      return;
    }
  }
};

// const htmlText1 = `<A></A><B></B>`;
// const htmlText2 = `<A><B><C></C></B></A>`;

// const sample1 = `The following text<C><B>is centred and in boldface</B></C>`;
// const sample2 = `<B>This <\g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence`;
//const sample3 = `<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>`;
// const sample4 = `<B>This should be in boldface, but there is an extra closing tag</B></C>`;
const sample5 = `<B><C>This should be centred and in boldface, but there is a missing closing tag</C>`;

tagChecker(sample5);
// tagChecker(sample5);
