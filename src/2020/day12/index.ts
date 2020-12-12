import * as fs from 'fs';

export type Action = 'N' | 'S' | 'E' | 'W' | 'L' | 'R' | 'F';
export type Instruction = {
  action: Action,
  value: number,
};
export type Vector = [number, number];
export type Orientation = [0, 1] | [0, -1] | [1, 0] | [-1, 0]; // N S E W
type Position = {
  location: Vector,
  orientation: Orientation,
};

const Orientations: Orientation[] = [[0, 1], [0, -1], [1, 0], [-1, 0]];

export const parseInstructions = (input: string): Instruction[] =>
    input.split("\n").filter((line: string) => line.length > 0)
      .map((inst: string) => {
        let split: RegExpMatchArray | null = inst.match(/([A-Z])([0-9]*)/);
        if (split === null) throw new Error("invalid input");
        return {
          action: split[1] as Action,
          value: parseInt(split[2], 10),
        };
      });

export const followInstructions = (instructions: Instruction[]): Position =>
    instructions.reduce((position: Position, i: Instruction) =>
      changePosition(i, position),
    { location: [0,0], orientation: [1, 0] }); // start at [0,0] facing east

export const changePosition = (instruction: Instruction, p: Position): Position => {
  switch (instruction.action) {
    case 'N': return { location: [ p.location[0], p.location[1] + instruction.value ], orientation: p.orientation };
    case 'S': return { location: [ p.location[0], p.location[1] - instruction.value ], orientation: p.orientation };
    case 'E': return { location: [ p.location[0] + instruction.value, p.location[1] ], orientation: p.orientation };
    case 'W': return { location: [ p.location[0] - instruction.value, p.location[1] ], orientation: p.orientation };
    case 'F': return { location: [ p.location[0] + (p.orientation[0] * instruction.value), p.location[1] + (p.orientation[1] * instruction.value) ], orientation: p.orientation };
    case 'R':
      return { location: p.location, orientation: reorient(p.orientation, 'R', instruction.value) }
    case 'L':
      return { location: p.location, orientation: reorient(p.orientation, 'L', 360 - instruction.value) }
    default:
      throw new Error("Not an understood instruction");
  }
};

type Direction = 'L' | 'R';

const transposition: Map<string, [Orientation, Orientation]> = new Map<string, [Orientation, Orientation]>()
  .set("0,1",  [ [-1, 0], [1, 0] ]) // North -> West, East
  .set("0,-1", [ [1, 0], [-1, 0] ]) // South -> East, West
  .set("1,0",  [ [0, 1], [0, -1] ]) // West  -> North, South
  .set("-1,0", [ [0, -1], [0, 1] ]) // East  -> South, North

export const reorient = (curr: Orientation, dir: Direction, amount: number): Orientation => {
  const idx: number = dir === 'L' ? 0 : 1;
  while (amount > 0) {
    let next = transposition.get(`${curr[0]},${curr[1]}`);
    if (next === undefined) throw new Error("This code is stupid");
    curr = next[idx];
    amount -= 90;
  }
  return curr;
}

export const manhattan = (position: Position): number => Math.abs(position.location[0]) + Math.abs(position.location[1]);

const part1 = (): void => {
  let is: Instruction[] = parseInstructions(fs.readFileSync("src/2020/day12/input", "utf8"))
  console.log("part1:", manhattan(followInstructions(is)));
}

part1();
