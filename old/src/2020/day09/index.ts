import * as fs from 'fs';

type XMAS = {
  preamble: number[],
  remaining: number[],
}

export const toNumbers = (input: string): number[] =>
    input.split("\n").filter((line: string) => line.length > 0).map((raw: string) => parseInt(raw, 0))

export const findNotSumOfPreamble = (ns: number[], len: number): number | undefined => {
  let preamble: number[] = ns.slice(0, len).sort((x, y) => x-y).reverse()
  for (let i: number = len; i < ns.length; i++) {
    if (!find(preamble, ns[i])) {
      return ns[i]
    }
    preamble.splice(preamble.findIndex((x: number) => x === ns[i-len]), 1); // remove the prior element from the preamble
    if (ns[i] >= preamble[0]) {
      preamble.unshift(ns[i]);
    } else if (ns[i] <= preamble[preamble.length - 1]) {
      preamble.push(ns[i])
    } else {
      for (let j: number = 0; j <= preamble.length; j++) {
        if (preamble[j] === undefined) {
          preamble.push(ns[i]);
          break;
        }
        if (preamble[j] >= ns[i] && ns[i] >= preamble[j+1]) {
          preamble.splice(j + 1, 0, ns[i]);
          break;
        }
      }
    }
  }
  return undefined;
}

const find = (preamble: number[], test: number): boolean => {
  for (let i: number = 0; i < preamble.length; i++) {
    for (let j: number = 0; j < preamble.length - 1; j++) {
      let sum: number = preamble[i] + preamble[j];
      if (sum == test) {
        return true;
      } else if (sum < test) {
        break;
      }
    }
  }
  return false;
};

export const findContiguousSum = (numbers: number[], target: number): number => {
  for (let i: number = 0; i < numbers.length; i++) {
    let sum: number = numbers[i];
    let j: number = i;
    while (sum < target && j < numbers.length) {
      j++;
      sum += numbers[j];
    }
    if (sum == target) {
      let s: number[] = numbers.slice(i, j+1).sort((x, y) => x-y);
      return s[0] + s[s.length - 1]
    }
  }
  return 0;
}

const numbers: number[] = toNumbers(fs.readFileSync("src/2020/day09/input", "utf8"));
const weakness: number = findNotSumOfPreamble(numbers, 25) || 0;
console.log("part1:", weakness);
console.log("part2:", findContiguousSum(numbers, weakness))
