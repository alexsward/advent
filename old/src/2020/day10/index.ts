import * as fs from 'fs';

export type Adapter = number

export const toSortedAdapters = (raw: Adapter[]): Adapter[] => {
  raw.sort(sortAdapters);
  raw.unshift(0);
  raw.push(raw[raw.length - 1] + 3);
  return raw;
}

export const sortAdapters = (a1: Adapter, a2: Adapter): number => a1 - a2;

export const differences = (adapters: Adapter[]): number[] =>
    adapters.sort(sortAdapters).reduce((diffs: number[], adapter: Adapter, i: number, all: Adapter[]) => {
      if (i == 0) {
        return diffs;
      }
      let prev: Adapter = (all[i-1] || 0);
      diffs[(adapter - prev) - 1]++;
      return diffs;
    }, [0, 0, 0]);

export const arrangements = (adapters: Adapter[], idx: number = 0, arrs: Map<number, number> = new Map<number, number>()): number => {
  if (idx === adapters.length - 1) {
    return 1;
  }
  let connections: number = 0;
  for (let i: number = 1; i < 4; i++) {
    if (adapters[idx + i] - adapters[idx] <= 3) {
      if (arrs.has(adapters[idx + i])) {
        connections += arrs.get(adapters[idx + i]) || 0;
      } else {
        const result: number = arrangements(adapters, idx + i, arrs);
        arrs.set(adapters[idx + i], result);
        connections += result;
      }
    }
  }
  return connections;
};

const part1 = (): void => {
  const contents: string[] = fs.readFileSync("src/2020/day10/input", "utf8").split("\n").filter((line: string) => line.length > 0);
  const diffs: number[] = differences(contents.map((raw: string) => parseInt(raw, 10)));
  console.log("part1:", diffs[0] * diffs[2]);
};

const part2 = (): void => {
  const contents: string[] = fs.readFileSync("src/2020/day10/input", "utf8").split("\n").filter((line: string) => line.length > 0);
  let adapters: Adapter[] = contents.map((raw: string) => parseInt(raw, 10)).sort(sortAdapters);
  adapters.unshift(0);
  console.log("arrangements:", arrangements(adapters));
};

part1();
part2();
