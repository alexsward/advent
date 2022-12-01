import { followInstructions, manhattan, parseInstructions, reorient } from './index';

test('rotate', () => {
  expect(reorient([0, 1], 'R', 90)).toStrictEqual([1, 0]);
});

test('simple example', () => {
  let inst = parseInstructions("F10\nN3\nF7\nR90\nF11");
  expect(manhattan(followInstructions(inst))).toEqual(25);
});
