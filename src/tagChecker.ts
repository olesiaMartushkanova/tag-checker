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

const input1 = 'The following text<C><B>is centred and in boldface</B></C>';
const input2 =
  '<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence';
const input3 =
  '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>';
const input4 =
  '<B>This should be in boldface, but there is an extra closing tag</B></C>';
const input5 =
  '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>';
const input6 = '<A></A><B></B>';
const input7 = '<A><B><C></C></B></A>';

tagChecker(input1);
tagChecker(input2);
tagChecker(input3);
tagChecker(input4);
tagChecker(input5);
tagChecker(input6);
tagChecker(input6);
tagChecker(input7);
