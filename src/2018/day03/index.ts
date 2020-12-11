import * as fs from 'fs';

export type Claim = {
  id: number,
  left: number,
  top: number,
  width: number,
  height: number,
};

type ClaimIds = number[]

export type Grid = ClaimIds[][]

export const toClaim = (line: string): Claim => {
  let matches: RegExpMatchArray = line.match(/#([0-9]*) @ ([0-9]*)\,([0-9]*)\: ([0-9]*)x([0-9]*)/) || [];
  return {
    id: parseInt(matches[1], 10),
    left: parseInt(matches[2], 10),
    top: parseInt(matches[3], 10),
    width: parseInt(matches[4], 10),
    height: parseInt(matches[5], 10),
  }
};

export const coverGrid = (claims: Claim[], width: number, height: number): Grid =>
    claims.reduce(fill, new Array(height).fill(0).map(() => new Array(width).fill(0).map(() => []))) // i hate javascript arrays

const fill = (grid: Grid, claim: Claim): Grid => {
  for (let i: number = claim.top; i < (claim.top + claim.height); i++) {
    for (let j: number = claim.left; j < (claim.left + claim.width); j++) {
      grid[i][j].push(claim.id);
    }
  }
  return grid;
};

export const find = (grid: Grid, claim: Claim): boolean => {
  for (let i: number = claim.top; i < (claim.top + claim.height); i++) {
    for (let j: number = claim.left; j < (claim.left + claim.width); j++) {
      if (grid[i][j].length != 1) {
        return false;
      }
    }
  }
  return true;
}

const part1 = (): void => {
  const claims: Claim[] = fs.readFileSync("src/2018/day03/input", "utf8")
      .split("\n").filter((line: string) => line.length > 0)
      .map(toClaim);
  let g: Grid = coverGrid(claims, 1000, 1000);
  console.log("part1:", g.reduce((sum: number, row: ClaimIds[]) => sum + row.reduce((t: number, x) => t + ((x.length > 1) ? 1 : 0), 0), 0));
};

const part2 = (): void => {
  const claims: Claim[] = fs.readFileSync("src/2018/day03/input", "utf8")
      .split("\n").filter((line: string) => line.length > 0)
      .map(toClaim);
  let g: Grid = coverGrid(claims, 1000, 1000);
  console.log("part2:", claims.find((claim: Claim) => find(g, claim))?.id || "not found");
};

part1();
part2();
