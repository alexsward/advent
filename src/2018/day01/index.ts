import * as fs from 'fs';

const deltas = (filename: string): number[] =>
    fs.readFileSync(filename, "utf8")
      .split("\n")
      .filter((line: string) => line.length > 0)
      .map((line: string) => parseInt(line, 10))

const frequency = (ds: number[]): number =>
    ds.reduce((total: number, delta: number) => total + delta, 0);

type Frequencies = {
  current: number,
  hits: Map<number, number>,
}

export const firstRepeat = (ds: number[]): number | undefined => {
  let frequencies: Frequencies = { current: 0, hits: new Map<number, number>() };
  let runs: number = 0;
  do {
    for (let i: number = 0; i < ds.length; i++) {
      frequencies.current = frequencies.current + ds[i];
      frequencies.hits.set(frequencies.current, (frequencies.hits.get(frequencies.current) || 0) + 1);
      if ((frequencies.hits.get(frequencies.current) || 0) > 1) {
        return frequencies.current;
      }
    }
    runs++;
  } while (runs < 1000);
  return undefined;
}


const delts = deltas("src/2018/day01/input");
const part1 = (): void => console.log(frequency(delts));
const part2 = (): void => console.log(firstRepeat(delts));
part1();
part2();
