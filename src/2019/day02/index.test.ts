import { execute, Program } from './index';

test('execute simple cases', () => {
  expect(execute([1,0,0,0,99])).toEqual<number[]>([2,0,0,0,99]);
  expect(execute([2,3,0,3,99])).toEqual<number[]>([2,3,0,6,99]);
  expect(execute([2,4,4,5,99,0])).toEqual<number[]>([2,4,4,5,99,9801]);
  expect(execute([1,1,1,4,99,5,6,0,99])).toEqual<number[]>([30,1,1,4,2,5,6,0,99]);
});
