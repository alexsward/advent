import { execute, parseProgram } from './index';

test('example program', () => {
  const contents: string = "nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6\n";
  expect(execute(parseProgram(contents))[0]).toEqual(5);
});
