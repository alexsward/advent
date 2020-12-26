import * as fs from 'fs';

type Memory = number[];
type Bit = 0 | 1 | 'X';
type Mask = string;
type State = {
  memory: Memory,
  mask: Mask,
};
type Write = {
  type: 'write',
  address: number,
  value: number,
};
type MaskChange = {
  type: 'mask',
  mask: string,
};
type InstructionType = 'write' | 'mask';
type Instruction = Write | MaskChange & {
  type: InstructionType,
}

const toInstructions = (input: string): Instruction[] =>
    input.split("\n").filter((line: string) => line.length > 0)
      .map((line: string) => {
        const parts: string[] = line.split(" = ");
        if (parts[0] === "mask") return { type: 'mask', mask: parts[1] }
        const m: RegExpMatchArray = line.match(/mem\[(\d+)\] = (\d+)/) || [];
        return {
          type: 'write',
          address: parseInt(m[1], 10),
          value: parseInt(m[2], 10),
        };
      });

const execute = (instructions: Instruction[]): Memory =>
    instructions.reduce((state: State, inst: Instruction) => {
      switch (inst.type) {
        case 'mask':
          state.mask = inst.mask
          break;
        case 'write':
          let transformed: string = inst.value.toString(2).padStart(36, "0")
            .split("")
            .map((digit: string, i: number) => state.mask[i] === 'X' ? digit : state.mask[i])
            .join("");
          state.memory[inst.address] = parseInt(transformed, 2);
          break;
      };
      return state;
    }, { memory: Array(36).fill(0), mask: "" })
    .memory

const test: string = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

const part1 = (): void => {
  const memory: Memory = execute(toInstructions(fs.readFileSync("src/2020/day14/input", "utf8")));
  console.log("part1:", memory.reduce((x, y) => x + y));
};

part1();
