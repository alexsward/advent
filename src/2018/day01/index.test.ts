import { firstRepeat } from './index';

test('first repeat', () => {
  expect(firstRepeat([+1, -1])).toBe(0);
  expect(firstRepeat([+3, +3, +4, -2, -4])).toBe(10);
  expect(firstRepeat([-6, +3, +8, +5, -6])).toBe(5);
  expect(firstRepeat([+7, +7, -2, -7, -4])).toBe(14);
});
