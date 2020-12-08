import { findNearest, findSteps, intersections, toVector, toWire, traverse, Point, Wire } from './index';

const point = (x: number, y: number): Point => ({ x: x, y: y });

test('test traverse', () => {
  expect(traverse(point(0,0), 'x', 1, 4)).toEqual([ point(1,0), point(2,0), point(3,0), point(4,0)]);
  expect(traverse(point(4,0), 'x', -1, 4)).toEqual([ point(3,0), point(2,0), point(1,0), point(0,0)]);
});

test('4-step case', () => {
  let w1: Wire = toWire("R8,U5,L5,D3".split(",").map(toVector));
  let w2: Wire = toWire("U7,R6,D4,L4".split(",").map(toVector));
  const is: Point[] = intersections(w1, w2);
  expect(is[0]).toStrictEqual<Point>({ x: 3, y: 3});
  expect(is[1]).toStrictEqual<Point>({ x: 6, y: 5});
  expect(findNearest(is)).toStrictEqual([ { x: 3, y: 3 }, 6 ]);
});
