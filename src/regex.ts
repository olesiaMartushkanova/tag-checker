export const CORRECT_HTML_TAG_REGEX = new RegExp(
  `<(?<openingTag>[A-Z]{1})>(?<children>.*)<\/(?<closingTag>[A-Z]{1})>`,
);
export const MISSING_OPENING_TAG_REGEX = new RegExp(
  `^(?!<[A-Z]{1}>).*<\/(?<closingTag>[A-Z]{1})>`,
);
export const MISSING_CLOSING_TAG_REGEX = new RegExp(
  `^<(?<openingTag>[A-Z]{1})>.*(?<!<\/[A-Z]{1}>)$`,
);
export const CONTAINS_TAGS_REGEX = new RegExp(`<[A-Z]{1}|<\/[A-Z]{1}>`);
export const TAG_REGEX = new RegExp(/<\/*[A-Z{1}]>/g);
