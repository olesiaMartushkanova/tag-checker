import { validateTagPairMatch } from './utils';

const CORRECT_HTML_TAG_REGEXP = new RegExp(
  `<(?<openingTag>[A-Z]{1})>(?<children>.*)<\/(?<closingTag>[A-Z]{1})>`,
);
const missingOpeningTag = new RegExp(
  `^(?!<[A-Z]{1}>).*<\/(?<closingTag>[A-Z]{1})>`,
);

// OLD
// const missingClosingTag = new RegExp(
//   `^<(?<openingTag>[A-Z]{1})>.*(?<!<\/[A-Z]{1}>)\z`,
// );

const missingClosingTag = new RegExp(
  `^<(?<openingTag>[A-Z]{1})>.*(?<!<\/[A-Z]{1}>)$`,
);

const containsTags = new RegExp(`<[A-Z]{1}|<\/[A-Z]{1}>`);

export const check = (html: string) => {
  const matchesCorrect = html.match(CORRECT_HTML_TAG_REGEXP);

  if (matchesCorrect) {
    if (
      matchesCorrect?.groups?.openingTag !== matchesCorrect?.groups?.closingTag
    ) {
      validateTagPairMatch(html);
      return;
    }

    if (
      !matchesCorrect?.groups?.children ||
      !containsTags.test(matchesCorrect?.groups?.children as string)
    ) {
      console.log('Correctly tagged paragraph');
      return;
    } else {
      if (matchesCorrect?.groups?.children) {
        check(matchesCorrect?.groups?.children);
      }
    }
  } else {
    const matchesMissingOpeningTag = html.match(missingOpeningTag);
    if (matchesMissingOpeningTag) {
      console.log(
        `Expected # found ${matchesMissingOpeningTag?.groups?.closingTag}`,
      );
      return;
    }
  }

  console.log('^^^', html.match(missingClosingTag));
  const matchesMissingClosingTag = html.match(missingClosingTag);
  if (matchesMissingClosingTag) {
    console.log('Missing close tag');

    console.log(
      `Expected ${matchesMissingClosingTag?.groups?.openingTag} found #`,
    );
    return;
  }
};

// const htmlText1 = `<A></A><B></B>`;
// const htmlText2 = `<A><B><C></C></B></A>`;

// const sample1 = `The following text<C><B>is centred and in boldface</B></C>`;
// const sample2 = `<B>This <\g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence`;
const sample3 = `<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>`;
// const sample4 = `<B>This should be in boldface, but there is an extra closing tag</B></C>`;
// const sample5 = `<B><C>This should be centred and in boldface, but there is a missing closing tag</C>`;

check(sample3);
