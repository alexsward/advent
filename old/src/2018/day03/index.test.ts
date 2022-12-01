import { coverGrid, find, toClaim, Claim } from './index';

test('toClaim', () => {
  expect(toClaim("#1 @ 151,671: 11x15")).toStrictEqual<Claim>({ id: 1, left: 151, top: 671, width: 11, height: 15 });
})

test('find uncovered by more than one', () => {
  let claims: Claim[] = ["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"].map(toClaim);
  let grid = coverGrid(claims, 8, 8);
  expect(find(grid, claims[2])).toStrictEqual(true);
})
