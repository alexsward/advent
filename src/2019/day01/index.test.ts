import { fuel } from './index';

test('test incremental fuel', () => {
  expect(fuel(100756)).toBe(50346);
});
