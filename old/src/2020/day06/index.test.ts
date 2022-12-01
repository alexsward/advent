import { answersPerPerson, totalForAll, Answers } from './index';

const fill = (arr: Answers, indices: number[]): Answers =>
    indices.reduce((acc: Answers, i: number) => {
      arr[i] = 1;
      return arr;
    }, arr);

test('answersPerPerson', () => {
  let p1: Answers = fill(new Array(26).fill(0), [0,1]);
  let p2: Answers = fill(new Array(26).fill(0), [0,2]);
  expect(answersPerPerson(["ab", "ac"])).toEqual<Answers[]>([p1, p2]);
});

test('totalForAll', () => {
  expect(totalForAll(answersPerPerson(["abc"]))).toEqual(3);
  expect(totalForAll(answersPerPerson(["a", "b", "c"]))).toEqual(0);
  expect(totalForAll(answersPerPerson(["ab", "ac"]))).toEqual(1);
  expect(totalForAll(answersPerPerson(["a", "a", "a", "a"]))).toEqual(1);
  expect(totalForAll(answersPerPerson(["b"]))).toEqual(1);
})

test('totalForAll summed across groups', () => {
  let answers: number[] = [
    totalForAll(answersPerPerson(["abc"])),
    totalForAll(answersPerPerson(["a", "b", "c"])),
    totalForAll(answersPerPerson(["ab", "ac"])),
    totalForAll(answersPerPerson(["a", "a", "a", "a"])),
    totalForAll(answersPerPerson(["b"]))
  ];
  expect(answers.reduce((acc, n) => acc + n)).toEqual(6);
})
