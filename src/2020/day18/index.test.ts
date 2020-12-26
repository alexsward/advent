import { evaluate, lineToExpression } from './index';

test('evaluate simple cases', () => {
  expect(evaluate(lineToExpression("1 + 2 * 3 + 4 * 5 + 6"))).toEqual(71)
  expect(evaluate(lineToExpression("1 + (2 * 3) + (4 * (5 + 6))"))).toEqual(51)
  expect(evaluate(lineToExpression("2 * 3 + (4 * 5)"))).toEqual(26)
  expect(evaluate(lineToExpression("5 + (8 * 3 + 9 + 3 * 4 * 3)"))).toEqual(437)
  expect(evaluate(lineToExpression("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))"))).toEqual(12240)
  expect(evaluate(lineToExpression("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2"))).toEqual(13632)
});
