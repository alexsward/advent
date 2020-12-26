import * as fs from 'fs';

export const reduce = (polymer: string): string => {
  let units: string[] = polymer.split("")
  units = units.slice();
  for (let i: number = units.length - 2; i >= 0; i--) {
    const x: string = units[i];
    const y: string = units[i + 1];
    if ((x === x.toLowerCase() && y === x.toUpperCase()) || (x === x.toUpperCase() && y === x.toLowerCase())) {
      units.splice(i, 2);
      if (i === units.length) i--;
    }
  }
  return units.join("")
}
