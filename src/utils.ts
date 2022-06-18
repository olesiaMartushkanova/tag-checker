const TAG_REGEXP = new RegExp(/<\/*[A-Z{1}]>/g);

export const validateTagPairMatch = (html: string) => {
  const result = html.match(TAG_REGEXP) as [string];
  const middle = Math.floor(result?.length || 0) / 2;

  const lastMiddleElement = result[middle - 1];
  const firstElementFromMiddle = result[middle];

  for (let i = 0; i < middle; i++) {
    if (result?.[middle - i] !== result?.[middle + i]) {
      console.log(
        `Expected ${lastMiddleElement} found ${firstElementFromMiddle}`,
      );
      return;
    }
  }
};
