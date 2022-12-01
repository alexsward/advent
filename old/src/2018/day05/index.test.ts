import { reduce } from './index';

test('reduce: simple cases', () => {
  expect(reduce("aA")).toEqual("")
  expect(reduce("abBA")).toEqual("aA");
  expect(reduce("abAB")).toEqual("abAB");
  expect(reduce("aabAAB")).toEqual("aabAAB");
})
