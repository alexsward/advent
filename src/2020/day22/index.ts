import * as fs from 'fs';

const play = (hand1: number[], hand2: number[]): number => {
  while (true) {
    const c1: number = hand1.shift() || 0;
    const c2: number = hand2.shift() || 0;
    if (c1 < c2) {
      hand2.push(c2)
      hand2.push(c1)
    } else {
      hand1.push(c1)
      hand1.push(c2)
    }
    if (hand1.length === 0 || hand2.length === 0) {
      const winner: number[] = hand1.length === 0 ? hand2 : hand1;
      return winner
          .map((score: number, idx: number) => score * (winner.length - idx))
          .reduce((x: number, y: number) => x + y)
    }
  }
};

const parseInput = (): [number[], number[]] => {
  const players: number[][] = fs.readFileSync("src/2020/day22/input", "utf8").split(/\n\n/)
      .map((player: string) => player.split("\n")
        .filter((line: string) => !line.startsWith("Player") && line.length > 0)
        .map((c) => parseInt(c, 10)))
  return [players[0], players[1]]
}

const part1 = (): void => {
  const players: number[][] = parseInput();
  console.log("part1:", play(players[0], players[1]));
};

const part2 = (): void => {
  
};

part1();

export {}
