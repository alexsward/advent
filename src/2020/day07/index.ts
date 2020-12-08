import * as fs from 'fs';

const input = (filename: string): string[] =>
    fs.readFileSync(filename, "utf8").split("\n")
      .filter((raw: string) => raw.length > 0);

// tuple of [string (bag description), [bag description, qty][]]
type Contained = [string, number];
type Rule = [string, Contained[]]

const parse = (input: string[]): Rule[] =>
    input.map((line: string) => {
      const parts: string[] = line.split("bags contain");
      return [ parts[0].trim(), parts[1].split(",").map(toContained) ];
    });

const toContained = (raw: string): Contained => {
  if (raw == " no other bags.") return ["done", 0];
  const parts: string[] = raw.split(/(\d+) (\w+ \w+)/)
  return [ parts[2], parseInt(parts[1], 10)];
};

const indexRules = (rules: Rule[]): Map<string, Rule> =>
    rules.reduce((m: Map<string, Rule>, x: Rule) => {
      m.set(x[0], x);
      return m
    }, new Map<string, Rule>());

const totalCanContain = (index: Map<string, Rule> ): number =>
    Array.from(index.keys()).filter((bag: string) => isContainedDeep(index, index.get(bag)?.[1] || [], "shiny gold")).length;

const isContained = (contains: Contained[], bag: string): boolean =>
    contains.some((contained: Contained) => contained[0] === bag)

const isContainedDeep = (index: Map<string, Rule>, contains: Contained[], bag: string): boolean =>
    isContained(contains, bag) || contains.some((child: Contained) => index.has(child[0]) && isContainedDeep(index, index.get(child[0])?.[1] || [], bag));

const getFromIndex = (index: Map<string, Rule>, key: string): Rule => index.get(key) || [ "done", [] ];

const countContainedBags = (layer: string, index: Map<string, Rule>): number =>
    getFromIndex(index, layer)[1].reduce((total: number, c: Contained) => total + c[1] + (c[1] * countContainedBags(c[0], index)), 0);

const index: Map<string, Rule> = indexRules(parse(input("src/2020/day07/input")));
console.log("part1:", totalCanContain(index));
console.log("part2:", countContainedBags("shiny gold", index));
