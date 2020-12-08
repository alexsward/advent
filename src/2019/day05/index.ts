import * as comp from '../../lib/computer';
import * as fs from 'fs';

let p: comp.Program = comp.parseProgram(fs.readFileSync("src/2019/day05/input", "utf8"));
comp.execute(p);
