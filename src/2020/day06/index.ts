import * as fs from 'fs';

export type Answers = (number)[];

const input = (filename: string): string[][] =>
  fs.readFileSync(filename, "utf8")
    .split("\n\n")
    .filter((line: string) => line.length > 0)
    .map((chunk: string) => chunk.split("\n").filter((n) => n.length > 0)) // whitespace sucks.

const answers = (raw: string[]): Answers =>
    raw.join("").split("").reduce((acc: Answers, n: string) => {
      acc[n.charCodeAt(0) - 97] = 1;
      return acc;
    }, new Array(26).fill(0) as Answers);

export const answersPerPerson = (raw: string[]): Answers[] =>
    raw.map((person: string) => person.split("")).map((answers: string[]) =>
        answers.reduce((acc: Answers, n: string) => {
          acc[n.charCodeAt(0) - 97] = 1;
          return acc;
        }, new Array(26).fill(0) as Answers));

export const totalForAll = (answers: Answers[]): number =>
    answers.reduce((acc: Answers, person: Answers) => {
      person.forEach((n: number, idx: number) => {
        if (n == 1) {
          acc[idx] = acc[idx] + 1;
        }
      });
      return acc;
    }, new Array(26).fill(0) as Answers)
    .filter((n: number) => n == answers.length)
    .length;

const part1 = (filename: string): number =>
    input(filename)
      .map(answers)
      .map((ans) => ans.filter((n: number) => n !== undefined && n > 0).length)
      .reduce((acc: number, x: number) => acc + x, 0);

const part2 = (filename: string): number =>
    input(filename)
      .map(answersPerPerson)
      .map(totalForAll)
      .reduce((acc: number, x: number) => acc + x, 0);

console.log("part1:", part1("src/2020/day06/input"))
console.log("part2:", part2("src/2020/day06/input"))
