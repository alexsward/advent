import * as fs from 'fs';

export const fuel = (mass: number): number => {
  let extra: number = Math.floor(mass / 3) - 2;
  if (extra >= 0) {
    return extra + fuel(extra);
  }
  return 0
}

const totalMass = (filename: string, calc: (mass: number) => number): number =>
    fs.readFileSync(filename, "utf8").split("\n")
      .filter((line: string) => line.length > 0)
      .map((line: string) => parseInt(line))
      .map(calc)
      .reduce((acc, mass) => acc + mass, 0);

console.log("part1:", totalMass("src/2019/day01/input", (mass: number) => Math.floor(mass / 3) - 2));
console.log("part2:", totalMass("src/2019/day01/input", fuel));
