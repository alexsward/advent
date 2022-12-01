import { arrangements, differences, toSortedAdapters } from './index';

const ex1 = toSortedAdapters([16,10,15,5,1,11,7,19,6,12,4]);
const ex2 = toSortedAdapters([28,33,18,42,31,14,46,20,48,47,24,23,49,45,19,38,39,11,1,32,25,35,8,17,7,9,4,2,34,10,3]);

test('simple cases', () => {
  expect(differences(ex1)).toEqual<number[]>([7, 0, 5]);
  expect(differences(ex2)).toEqual<number[]>([22, 0, 10]);
});

test('arrangements', () => {
  // 0 1 4 5 6 7 10 11 12 15 16 19 22
  expect(arrangements(ex1)).toEqual<number>(8);
  expect(arrangements(ex2)).toEqual<number>(19208);
});
