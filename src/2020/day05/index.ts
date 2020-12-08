import * as fs from 'fs';

// working with binary in typescript is not great. would have done this differently in go, rust, kotlin, etc.

const enum Token {
  FRONT = 'F',
  BACK = 'B',
  LEFT = 'L',
  RIGHT = 'R',
};

export type BoardingPass = Token[];

export type Seat = {
  row: number,
  column: number,
};

type Range = {
  start: number,
  end: number,
}

export const toBoardingPass = (str: string): BoardingPass => str.split("").map(toToken);

const toToken = (str: string): Token => {
  switch (str) {
    case 'F': return Token.FRONT
    case 'B': return Token.BACK
    case 'L': return Token.LEFT
    case 'R': return Token.RIGHT
    default: throw "Invalid input";
  }
}

const readPasses = (filename: string): BoardingPass[] =>
    fs.readFileSync(filename, "utf8").split("\n")
      .filter((line: string) => line.length > 0)
      .map((line: string) => line.split("").map(toToken))

const seek = (tokens: Token[], end: number, lower: Token, upper: Token): number => {
  let seek: Range = { start: 0, end: end };
  for (var i: number = 0; i < tokens.length - 1; i++) {
    let delta: number = Math.ceil((seek.end - seek.start) / 2);
    if (tokens[i] === lower) {
      seek = { start: seek.start, end: seek.end - delta };
    } else if (tokens[i] == upper) {
      seek = { start: seek.start + delta, end: seek.end };
    }
  }
  return tokens[tokens.length - 1] == lower ? seek.start : seek.end;
}

export const locate = (pass: BoardingPass): Seat => {
  return {
    row: seek(pass.slice(0, 7), 127, Token.FRONT, Token.BACK),
    column: seek(pass.slice(7, 10), 7, Token.LEFT, Token.RIGHT),
  };
};

const toSeatId = (seat: Seat) => (seat.row * 8) + seat.column;

const findMySeat = (seats: Seat[]): number => {
  let ids: number[] = seats.map(toSeatId).sort();
  for (var i: number = 0; i < seats.length - 1; i++) {
    if (ids[i+1] - ids[i] == 2) {
      return ids[i] + 1;
    }
  }
  return 0;
}

const passes = readPasses("src/2020/day05/input");
console.log("part1:", passes.map(locate).map(toSeatId).sort((x,y) => y-x)[0]); // highest
console.log("part2:", findMySeat(passes.map(locate)));
