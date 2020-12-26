import * as fs from 'fs';

type Operation = (x: number, y: number) => number;
const add: Operation = (x: number, y: number): number => x + y;
const multiply: Operation = (x: number, y: number): number => x * y;

export const lineToExpression = (line: string): string[] => line.replace(/ /g, '').split('')

export const evaluate = (expr: string[]): number => {
  let op: Operation = add;
  let value: number | undefined = undefined;
  for (let i: number = 0; i < expr.length; i++) {
    let c: string = expr[i];
    if (c === '(') {
      const idx: number = findEndOfExpression(expr, i)
      let next: number = evaluate(expr.slice(i + 1, idx));
      if (value === undefined) {
        value = next;
      } else {
        value = op(value, next);
      }
      i = idx;
    } else if (c === '*') {
      op = multiply;
    } else if (c === '+') {
      op = add;
    } else { // a number
      if (value === undefined) {
        value = parseInt(c, 10)
      } else {
        value = op(value, parseInt(c, 10))
      }
    }
  }
  return value || 0;
}

const findEndOfExpression = (expr: string[], start: number): number => {
  let open: number = 0;
  let closed: number = 0;
  for (let i: number = start; i < expr.length; i++) {
    if (expr[i] === "(") {
      open++;
    } else if (expr[i] === ")") {
      closed++;
      if (open === closed) {
        return i;
      }
    }
  }
  return expr.length - 1;
}

const part1 = (): void => {
  const sum: number = fs.readFileSync("src/2020/day18/input", "utf8")
    .split("\n").filter((line: string) => line.length > 0)
    .map(lineToExpression)
    .map(evaluate)
    .reduce((sum: number, n: number) => sum + n, 0);
  console.log("part1:", sum);
};

part1();
