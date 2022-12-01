import { findContiguousSum, findNotSumOfPreamble, toNumbers } from './index';

const numbers: number[] = toNumbers("35\n20\n15\n25\n47\n40\n62\n55\n65\n95\n102\n117\n150\n182\n127\n219\n299\n277\n309\n576");

test('test findNotSumOfPreamble', () => {
  expect(findNotSumOfPreamble(numbers, 5)).toEqual(127);
});

test('test findContiguousSum', () => {
  expect(findContiguousSum(numbers, 127)).toEqual(62);
})
