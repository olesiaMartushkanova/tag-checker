import { tagChecker } from '../src/tagChecker';

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
tagChecker(input7);
