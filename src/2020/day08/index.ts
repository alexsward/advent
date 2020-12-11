import * as fs from 'fs';

type Op = 'nop' | 'acc' | 'jmp';
type Arg = number;
type Instruction = {
  op: Op,
  arg: Arg,
  executions: number
};
type Program = Instruction[];

export const parseProgram = (input: string): Program =>
    input
      .split("\n")
      .filter((line: string) => line.length > 0)
      .map((line: string) => line.split(" "))
      .map((parts: string[]) => {
        return {
          op: parts[0] as Op,
          arg: parseInt(parts[1], 10),
          executions: 0
        }
      });

export const execute = (program: Program): [number, Program] => {
  let accumulator: number = 0;
  for (let ptr: number = 0; ptr < program.length;) {
    const inst: Instruction = program[ptr];
    if (inst.executions == 1) {
      return [accumulator, program];
    }
    switch (inst.op) {
      case 'nop':
        ptr += 1;
        break;
      case 'acc':
        accumulator += inst.arg
        ptr += 1;
        break;
      case 'jmp':
        ptr += inst.arg;
        break;
    }
    inst.executions = inst.executions + 1;
  }
  return [accumulator, program];
}

export const findModification = (program: Program): [number, Program] => {
  for (let i: number = 0; i < program.length; i++) {
    if (program[i].op === 'acc') {
      continue;
    }
    const swap: Op = program[i].op == 'jmp' ? 'nop' : 'jmp';
    let inst: Instruction = { op: swap, arg: program[i].arg, executions: 0 };
    let modified: Program = [...program.slice(0, i), inst, ...program.slice(i + 1)]
    let [acc, p]: [number, Program] = execute(modified);
    if (p[p.length -1].executions > 0) {
      return [acc, p];
    }
    program.forEach((i: Instruction) => i.executions = 0); // objects in javascript suck.
  }
  return [0, program];
}

const part1 = (): number => execute(parseProgram(fs.readFileSync("src/2020/day08/input", "utf8")))[0];
const part2 = (): number => findModification(parseProgram(fs.readFileSync("src/2020/day08/input", "utf8")))[0];

console.log("part1:", part1())
console.log("part2:", part2());
