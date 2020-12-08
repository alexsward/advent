import * as fs from 'fs';

type Instruction = number;
export type Program = Instruction[];

const Add = 1;
const Multiply = 2;
const Terminus = 99;

const load = (filename: string): Program =>
    fs.readFileSync(filename, "utf8").split("\n")
      .filter((line: string) => line.length > 0)
      .join(",")
      .split(",")
      .map((i: string) => parseInt(i, 10));

export const execute = (program: Program): Program => {
  for (let idx: number = 0; idx <= program.length;) {
    switch (program[idx]) {
      case Terminus: return program
      case Add:
        program[program[idx + 3]] = program[program[idx + 1]] + program[program[idx + 2]];
        idx += 4;
        break;
      case Multiply:
        program[program[idx + 3]] = program[program[idx + 1]] * program[program[idx + 2]];
        idx += 4;
        break;
      default:
        idx++;
        break;
    }
  }
  return program;
};

const brute = (program: Program, target: number): number => {
  for (let i: number = 0; i < 100; i++) {
    for (let j: number = 0; j < 100; j++) {
      let reset: Program = Object.assign([], program);
      reset[1] = i;
      reset[2] = j;
      if (execute(reset)[0] == target) {
        return (100 * i) + j;
      };
    }
  }
  return 0;
}

console.log("part1:", execute(load("src/2019/day02/input"))[0]);
console.log("part2:", brute(load("src/2019/day02/input"), 19690720));
