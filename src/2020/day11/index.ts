import * as fs from 'fs';

const Floor = '.';
const Empty = 'L';
const Occupied = '#';
type State = 'floor' | 'empty' | 'occupied' | undefined;
type Layout = State[][];

type Direction = [ number, number ]

const DIRECTIONS: Direction[] = [
  [-1, 0],  // UP
  [1, 0],   // DOWN
  [0, -1],  // LEFT
  [0, 1],   // RIGHT
  [-1, 1],  // UP RIGHT
  [-1, -1], // UP LEFT
  [1, 1],   // DOWN RIGHT
  [1, -1],  // DOWN LEFT
];

export const toLayout = (input: string): Layout =>
    input.split("\n").filter((line: string) => line.length > 0)
      .map((row: string) => row.split("").map((seat: string) => {
        switch (seat) {
          case Floor: return 'floor'
          case Empty: return 'empty'
          case Occupied: return 'occupied'
          default: throw new Error("invalid input")
        }
      }))

export const adjust = (layout: Layout): [ Layout, boolean ] => {
  let changed: boolean = false;
  let next: Layout = Array(layout.length).fill(0).map((_) => Array());
  for (let i: number = 0; i < layout.length; i++) {
    let row: State[] = layout[i];
    for (let j: number = 0; j < row.length; j++) {
      let state: State = layout[i][j];
      next[i][j] = state;
      switch (state) {
        case 'floor': break;
        case 'empty':
          if (countSeats(layout, i, j, 'occupied') === 0) {
            changed = true;
            next[i][j] = 'occupied';
          }
          break;
        case 'occupied':
          if (countSeats(layout, i, j, 'occupied') >= 4) {
            changed = true;
            next[i][j] = 'empty';
          }
          break;
      }
    }
  }
  return [ next, changed ];
}

// TODO: way too lazy to combine these functions right now.
export const adjustDeep = (layout: Layout): [ Layout, boolean ] => {
  let changed: boolean = false;
  let next: Layout = Array(layout.length).fill(0).map((_) => Array());
  for (let i: number = 0; i < layout.length; i++) {
    let row: State[] = layout[i];
    for (let j: number = 0; j < row.length; j++) {
      let state: State = layout[i][j];
      next[i][j] = state;
      switch (state) {
        case 'floor': break;
        case 'empty':
          if (countSeatsDeep(layout, i, j, 'occupied') === 0) {
            changed = true;
            next[i][j] = 'occupied';
          }
          break;
        case 'occupied':
          if (countSeatsDeep(layout, i, j, 'occupied') >= 5) {
            changed = true;
            next[i][j] = 'empty';
          }
          break;
      }
    }
  }
  return [ next, changed ];
}

export const countSeats = (layout: Layout, i: number, j: number, state: State): number => DIRECTIONS
    .map((d: Direction) => {
      let row: State[] = layout[i + d[0]]
      return !row ? undefined : (row[j + d[1]] || undefined)
    })
    .filter((s: State) => s !== undefined) // State is defined as being able to be undefined
    .filter((s: State) => s === state)
    .length

export const countSeatsDeep = (layout: Layout, i: number, j: number, state: State): number => DIRECTIONS
    .map((dir: Direction) => {
      let [x, y, next]: [ number, number, State ] = nextSeat(layout, i, j, dir)
      while (next === 'floor') {
        [x, y, next] = nextSeat(layout, x, y, dir);
      }
      return next;
    })
    .filter((s: State) => s !== undefined) // State is defined as being able to be undefined
    .filter((s: State) => s === state)
    .length;

const nextSeat = (layout: Layout, i: number, j: number, dir: Direction): [number, number, State] => {
  let x = i + dir[0], y = j + dir[1];
  let row: State[] = layout[x];
  return [x, y, !row ? undefined : (row[y] || undefined)]
}

export const countOccupied = (layout: Layout): number =>
    layout.reduce((i: number, row: State[]) =>
      i + row.reduce((j: number, state: State): number =>
        j + (state === 'occupied' ? 1 : 0),
      0), 0);

type Adjuster = (l: Layout) => [ Layout, boolean];

const change = (layout: Layout, adjuster: Adjuster = adjust): Layout => {
  let changed = true;
  let iters: number = 0;
  while (changed && iters < 10000) { // had an infinite loop at one point, resolved it
    [ layout, changed ] = adjuster(layout)
    iters++;
  }
  return layout;
};

const part1 = (): void => {
  const layout: Layout = toLayout(fs.readFileSync("src/2020/day11/input", "utf8"));
  console.log("part1:", countOccupied(change(layout, adjust)));
}

const part2 = (): void => {
  const layout: Layout = toLayout(fs.readFileSync("src/2020/day11/input", "utf8"));
  console.log("part2:", countOccupied(change(layout, adjustDeep)));
}

part2();
