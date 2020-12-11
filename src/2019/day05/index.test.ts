import * as comp from '../../lib/computer';

test('test simplest programs', () => {
  expect(comp.execute(comp.parseProgram("1002,4,3,4,33"))).toStrictEqual<comp.Program>([1002, 4, 3, 4, 99]);
  expect(comp.execute(comp.parseProgram("1101,100,-1,4,0"))).toStrictEqual<comp.Program>([1101, 100, -1, 4, 99]);
});

test('jump if true', () => {
  console.log(comp.execute(comp.parseProgram("5,1,8,1001,1,-1,1,99,3")));
});
