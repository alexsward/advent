import * as readline from 'readline';

export enum Mode {
  POSITION = 0,
  IMMEDIATE = 1,
}

export type PositionMode = Mode.POSITION;
export type ImmediateMode = Mode.IMMEDIATE;
export type ParameterMode = PositionMode | ImmediateMode;

export enum OpCode {
  ADD = 1,
  MULTIPLY = 2,
  INPUT = 3,
  OUTPUT = 4,
  JUMP_TRUE = 5,
  JUMP_FALSE = 6,
  LESS_THAN = 7,
  EQUALS = 8,
  TERMINATE = 99,
}

const isValidCode = (candidate: number): boolean => (1 <= candidate || candidate <= 4) || candidate == 99;

const toCode = (raw: number): OpCode => {
  const code: number = raw % 100;
  if (!isValidCode) throw new Error("Invalid op code ${code} for input ${raw}");
  return code;
}

export type Instruction = {
  code: OpCode,
  modes: ParameterMode[],
};
export type Program = number[]

const DefaultModes = [ Mode.POSITION, Mode.POSITION, Mode.POSITION ];

export const parseProgram = (contents: string): Program =>
    contents.split(",").map((code: string) => parseInt(code, 10)).filter((n: number) => !isNaN(n));

export const toInstruction = (program: Program, index: number): Instruction => {
  let code: number = program[index];
  const op: number = toCode(code);
  if (code < 99) {
    return { code: op, modes: DefaultModes };
  }
  let hack: string = code.toString().padStart(5, '0');
  return { code: op, modes: [ parseInt(hack[2], 10), parseInt(hack[1], 10), parseInt(hack[0], 10) ] };
};

export const execute = (program: Program): Program => {
  for (let idx: number = 0; idx < program.length;) {
    let inst: Instruction = toInstruction(program, idx);
    switch (inst.code) {
      case OpCode.TERMINATE: return program
      case OpCode.ADD:
        idx = add(program, inst, idx)
        break;
      case OpCode.MULTIPLY:
        idx = multiply(program, inst, idx);
        break;
      case OpCode.OUTPUT:
        console.log(fetchValue(program, inst.modes[0], idx + 1));
        idx += 2;
        break;
      case OpCode.INPUT:
        // console.log("should be first INPUT: ", idx, inst);
        let input: number = 5;
        // rl.question("Please input a value: ", (v: string) => {
        //   input = parseInt(v, 10);
        //   rl.close();
        // });
        program[program[idx + 1]] = input;
        idx += 2;
        break;
      case OpCode.JUMP_TRUE:
        idx = jumpTrue(program, inst, idx);
        break;
      case OpCode.JUMP_FALSE:
        idx = jumpFalse(program, inst, idx);
        break;
      case OpCode.LESS_THAN:
        idx = lessThan(program, inst, idx);
        break;
      case OpCode.EQUALS:
        idx = equals(program, inst, idx);
        break;
      default:
        idx++;
        break;
    }
  }
  return program;
};

const add = (program: Program, inst: Instruction, idx: number): number => {
  program[program[idx + 3]] = fetchValue(program, inst.modes[0], idx + 1) + fetchValue(program, inst.modes[1], idx + 2);
  return idx + 4;
}

const multiply = (program: Program, inst: Instruction, idx: number): number => {
  program[program[idx + 3]] = fetchValue(program, inst.modes[0], idx + 1) * fetchValue(program, inst.modes[1], idx + 2);;
  return idx + 4;
}

const jumpTrue = (program: Program, inst: Instruction, idx: number): number => {
  let test: number = fetchValue(program, inst.modes[0], idx + 1);
  if (test != 0) {;
    return fetchValue(program, inst.modes[1], idx + 2);
  } else {
    return idx + 3;
  }
}

const jumpFalse = (program: Program, inst: Instruction, idx: number): number => {
  let test: number = fetchValue(program, inst.modes[0], idx + 1);
  if (test == 0) {
    return fetchValue(program, inst.modes[1], idx + 2);
  } else {
    return idx + 3;
  }
}

const lessThan = (program: Program, inst: Instruction, idx: number): number => {
  let x: number = fetchValue(program, inst.modes[0], idx + 1);
  let y: number = fetchValue(program, inst.modes[1], idx + 2);
  let i: number = fetchValue(program, inst.modes[2], idx + 3);
  (x < y) ? program[i] = 1 : program[i] = 0;
  return idx + 4;
};

const equals = (program: Program, inst: Instruction, idx: number): number => {
  let x: number = fetchValue(program, inst.modes[0], idx + 1);
  let y: number = fetchValue(program, inst.modes[1], idx + 2);
  let i: number = fetchValue(program, inst.modes[2], idx + 3);
  (x === y) ? program[i] = 1 : program[i] = 0;
  return idx + 4;
}

const fetchValue = (program: Program, mode: Mode, idx: number): number =>
    mode === Mode.POSITION ? program[program[idx]] : program[idx];
