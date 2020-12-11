import * as fs from 'fs';

export const letters = (id: string): [boolean, boolean] => {
  let [ two, three]: [boolean, boolean] = [false, false];
  for (let c of id) {
    const count: number = id.split(c).length - 1;
    if (count == 2) {
      two = true;
    } else if (count == 3) {
      three = true;
    }
    if (two && three) {
      return [two, three];
    }
  }
  return [two, three]
}

const reducer = (totals: [number, number], test: [boolean, boolean]): [number, number] => {
  if (test[0]) {
    totals[0] += 1
  }
  if (test[1]) {
    totals[1] += 1
  }
  return totals;
}

const part1 = (): void => {
  let totals: [number, number] = fs.readFileSync("src/2018/day02/input", "utf8")
    .split("\n").filter((line: string) => line.length > 0)
    .map((id: string) => letters(id))
    .reduce(reducer, [0, 0]);
  console.log(totals[0] * totals[1]);
}

const part2 = (): void => {
  let data: string[] = fs.readFileSync("src/2018/day02/input", "utf8")
    .split("\n").filter((line: string) => line.length > 0);
  for (let i: number = 0; i < data.length - 1; i++) {
    for (let j: number = 0; j < data.length; j++) {
      let matches: number = 0, misses: number = 0;
      let miss: number = -1;
      for (let k: number = 0; k < data[i].length; k++) {
        if (data[i].charAt(k) == data[j].charAt(k)) {
          matches++;
        } else {
          misses++;
          if (misses == 2) break;
          miss = k;
        }
      }
      if (misses == 1) {
        console.log(data[i].slice(0, miss) + data[i].slice(miss + 1, data[i].length + 1))
        return;
      }
    }
  }
}

part1();
part2();
