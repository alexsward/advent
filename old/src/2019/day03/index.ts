import * as fs from 'fs';

type Direction = 'U' | 'D' | 'L' | 'R';

export type Vector = {
  direction: Direction,
  scale: number,
}

export type Path = Vector[]

export type Point = {
  x: number
  y: number
}

const Zero = { x: 0, y: 0 };

export type Wire = Point[];

export const toVector = (raw: string): Vector => {
  return {
    direction: raw[0] as Direction,
    scale: parseInt(raw.slice(1), 10),
  }
};

// load the vector paths into memory
const load = (filename: string): Path[] =>
    fs.readFileSync(filename, "utf8").split("\n")
      .filter((raw: string) => raw.length > 0)
      .map((line: string) => line.split(",").map(toVector))

// determine every point where a vector leads to determine what the wire is
export const toWire = (path: Path): Wire => {
  let points: Point[] = [Zero];
  for (let i: number = 0; i < path.length; i++) {
    let vec: Vector = path[i]
    let traversed: Point[] = move(points[points.length - 1], vec);
    points.push(...traversed);
  }
  return points;
};

const move = (start: Point, vector: Vector): Point[] => {
  switch (vector.direction) {
    case 'D':
      return traverse(start, 'y', -1, vector.scale)
    case 'U':
      return traverse(start, 'y', 1, vector.scale)
    case 'L':
      return traverse(start, 'x', -1, vector.scale)
    case 'R':
      return traverse(start, 'x', 1, vector.scale)
  }
}

type Axis = 'x' | 'y';

export const traverse = (start: Point, axis: Axis, change: number, scale: number): Point[] =>
    Array.from(Array(scale).keys()).map((delta: number) => {
      let next: Point = { x: start.x, y: start.y }
      next[axis] = start[axis] + (change * (delta + 1));
      return next;
    })

type GroupedPoints = {
  [key: number]: [Point]
}

const groupBy = (points: Point[], axis: Axis): GroupedPoints =>
    points.reduce((acc: GroupedPoints, p: Point) => {
      acc[p[axis]] = acc[p[axis]] || [];
      acc[p[axis]].push(p)
      return acc;
    }, {} as GroupedPoints);

export const intersections = (w1: Wire, w2: Wire): Point[] => {
  let w1g: GroupedPoints = groupBy(w1, 'x');
  let w2g: GroupedPoints = groupBy(w2, 'x');
  return Object.keys(w1g).flatMap((key: string) => {
    let i: number = parseInt(key, 10);
    let w2ys: { [key: number]: boolean } = w2g.hasOwnProperty(i) ?
        w2g[i].reduce((acc: {[key: number]: boolean}, p: Point) => {
          acc[p.y] = true;
          return acc;
        }, {})
        : {};
    return w1g[i].filter((p: Point) => w2ys.hasOwnProperty(p.y));
  })
  .filter((p: Point) => p.x !== 0 && p.y !== 0);
};

const distance = (p: Point, q: Point): number => Math.abs(p.x - q.x) + Math.abs(p.y - q.y);

export const findNearest = (intersections: Point[]): [Point, number] => intersections
    .reduce((nearest: [Point, number], candidate: Point): [Point, number] => {
      let d: number = distance(candidate, Zero);
      return d < nearest[1] ? [candidate, d] : nearest;
    }, [ intersections[0], distance(intersections[0], Zero) ])

export const findSteps = (target: Point, path: Path, wire: Wire): number => {
  let points: Point[] = [Zero];
  for (let i: number = 0; i < path.length; i++) {
    let vec: Vector = path[i]
    let traversed: Point[] = move(points[points.length - 1], vec);
    points.push(...traversed);
    let d = traversed.findIndex((p: Point) => p.x == target.x && p.y == target.y);
    if (d > -1) {
      return path.slice(0, i).reduce((x, y) => x + y.scale, d + 1);
    }
  }
  return 0;
}

const part1 = (filename: string): number => {
  let wires: Wire[] = load(filename).map(toWire);
  return findNearest(intersections(wires[0], wires[1]))[1];
}

const part2 = (filename: string): number => {
  let paths: Path[] = load(filename)
  let wires: Wire[] = paths.map(toWire);
  let is: Point[] = intersections(wires[0], wires[1]);
  return is.reduce((acc: number, target: Point) => {
    let steps: number = findSteps(target, paths[0], wires[0]) + findSteps(target, paths[1], wires[1]);
    if (acc == 0 || steps < acc) {
      acc = steps;
    }
    return acc;
  }, 0);
}

console.log("part1:", part1("src/2019/day03/input"));
console.log("part2:", part2("src/2019/day03/input"));
