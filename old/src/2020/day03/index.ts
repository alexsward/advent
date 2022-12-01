import * as fs from 'fs';

type Vector = {
  right: number,
  down: number,
}

// Position is indexed such that the top left corner is 0,0 and the y-axis increases downwards
type Position = {
  x: number,
  y: number
}

const Empty = ".";
const Tree = "#"

type Row = string[];

type Grid = {
  rows: Row[],
  height: number,
}

// parseGrid returns a Grid that is not expanded to the right
const parseGrid = (filename: string): Grid => {
  const rows: Row[] = fs.readFileSync(filename, "utf8").split("\n")
      .filter((line: string) => line.length > 0)
      .map((line: string) => line.split(""))
  return {
    rows: rows,
    height: rows.length
  };
}

const findTerrain = (grid: Grid, vec: Vector, position: Position): [string, Position] => {
  const row: Row = grid.rows[position.y + vec.down];
  const terrain: string = row[(position.x + vec.right) % row.length]
  return [terrain, { x: position.x + vec.right, y: position.y + vec.down }];
}

const traverse = (grid: Grid, vec: Vector): number => {
  var pos: Position = { x: 0, y: 0 };
  let trees: number = 0;
  while (pos.y < grid.height - 1) {
    var [t, pos]: [string, Position] = findTerrain(grid, vec, pos);
    if (t == Tree) {
      trees++;
    }
  }
  return trees;
}

const part2 = (grid: Grid, vectors: Vector[]): number =>
    vectors.map((vec) => traverse(grid, vec)).reduce((acc, cv) => acc * cv, 1);

let grid: Grid = parseGrid("src/2020/day03/input");
const newv = (x: number, y: number): Vector => ({ right: x, down: y });
console.log("part1:", traverse(grid, newv(3, 1)));
console.log("part2:", part2(grid, [newv(1,1), newv(3,1), newv(5,1), newv(7,1), newv(1,2)]));
