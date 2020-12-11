import * as fs from 'fs';

const getInput = (filename: string): number[] =>
    fs.readFileSync(filename, "utf8").split("\n")
      .map((line: string) => parseInt(line, 10))
      .sort((x: number, y: number) => x - y);

const part1 = (): number => {
  const data: number[] = getInput("src/2020/day01/input")
  for (let i: number = 0; i < data.length - 1; i++) {
    const x: number = data[i];
    for (let j: number = i+1; j < data.length; j++) {
      const sum: number = x + data[j];
      if (sum == 2020) {
        return x * data[j];
      } else if (sum > 2020) { // passed the threshold such that we could find an answer
        break;
      }
    }
  }
  return 0;
};

const part2 = (): number => {
  const data: number[] = getInput("src/2020/day01/input");
  for (let i: number = 0; i < data.length - 2; i++) {
    const x: number = data[i];
    for (let j: number = i+1; j < data.length - 1; j++) {
      const y: number = data[j];
      if (x + y > 2020) {
        break;
      }
      for (let k: number = j + 1; k < data.length; k++) {
        const sum: number = x + y + data[k];
        if (sum == 2020) {
          return x * y * data[k];
        } else if (sum > 2020) {
          break;
        }
      }
    }
  }
  return 0;
}

console.log("part1:", part1());
console.log("part2:", part2());
