import { locate, toBoardingPass, BoardingPass, Seat } from './index';

test('test locate', () => {
  let pass: BoardingPass = toBoardingPass("FBFBBFFRLR");
  expect(locate(pass)).toEqual<Seat>({ row: 44, column: 5 });
});
