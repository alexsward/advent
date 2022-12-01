import { letters } from './index';

test('letters', () => {
  expect(letters("abcdef")).toStrictEqual<[boolean, boolean]>([false, false]);
  expect(letters("bababc")).toStrictEqual<[boolean, boolean]>([true, true]);
  expect(letters("abbcde")).toStrictEqual<[boolean, boolean]>([true, false]);
  expect(letters("abcccd")).toStrictEqual<[boolean, boolean]>([false, true]);
  expect(letters("aabcdd")).toStrictEqual<[boolean, boolean]>([true, false]);
  expect(letters("abcdee")).toStrictEqual<[boolean, boolean]>([true, false]);
  expect(letters("ababab")).toStrictEqual<[boolean, boolean]>([false, true]);
})
