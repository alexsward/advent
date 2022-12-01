import * as fs from 'fs';

type Range = {
  min: number,
  max: number,
};

type Rule = {
  name: string,
  ranges: Range[],
};

type Ticket = number[];

const parseTicket = (line: string): Ticket => line.split(",").map((number: string) => parseInt(number, 10))

const parse = (): [Rule[], Ticket, Ticket[]] => {
  const parts: string[] = fs.readFileSync("src/2020/day16/input", "utf8").split(/\n\n/);
  const rules: Rule[] = parts[0].split("\n").filter((line: string) => line.length > 0)
      .map((line: string) => line.match(/([a-z\ ]*): (\d+)-(\d+) .* (\d+)-(\d+)/) || [])
      .map((matches: RegExpMatchArray) => ({
        name: matches[1],
        ranges: [
          { min: parseInt(matches[2], 10), max: parseInt(matches[3], 10) },
          { min: parseInt(matches[4], 10), max: parseInt(matches[5], 10) },
        ],
      }));
  const mine: Ticket = parseTicket(parts[1].split("\n")[1]);
  const nearby: Ticket[] = parts[2].split("\n").filter((line: string) => line.length > 0).slice(1).map(parseTicket);
  return [rules, mine, nearby];
};

const rangesToBitmap = (ranges: Range[]): number[] =>
    ranges.reduce((bitmap: number[], range: Range) => {
      for (let i: number = range.min; i <= range.max; i++) {
        bitmap[i] = 1;
      }
      return bitmap;
    }, [] as number[])

const satisfiesRule = (rule: Rule, n: number) => rule.ranges.some((range: Range) => range.min <= n && n <= range.max)

const part1 = (): void => {
  const [rules, mine, nearby]: [Rule[], Ticket, Ticket[]] = parse();
  const lookup: number[] = rangesToBitmap(rules.flatMap((rule: Rule) => rule.ranges))
  let error: number = nearby.map((ticket: Ticket) => ticket
      .filter((n: number) => lookup[n] === undefined)
      .reduce((sum: number, n: number) => sum + n, 0))
    .reduce((sum: number, n: number) => sum + n, 0)
  console.log("part1:", error);
};

const part2 = (): void => {
  const [rules, mine, nearby]: [Rule[], Ticket, Ticket[]] = parse();
  const lookup: number[] = rangesToBitmap(rules.flatMap((rule: Rule) => rule.ranges));
  const valid: Ticket[] = nearby.filter((ticket: Ticket) => ticket.some((n: number) => lookup[n] !== undefined));

  let possibilities: Rule[][] = rules.reduce((contenders: Rule[][], rule: Rule) => {
    for (let i: number = 0; i < 20; i++) {
      if (valid.every((ticket: Ticket) => satisfiesRule(rule, ticket[i]))) {
        contenders[i].push(rule)
      }
    }
    return contenders;
  }, Array(20).fill(0).map((_) => []));
  let known: Rule[] = [];
  while (possibilities.length > 0) {
    possibilities.forEach((contenders: Rule[], i: number) => {
      if (contenders.length === 1) {
        const found: Rule = contenders[0];
        known[i] = found;
        possibilities[i] = [];

        possibilities.forEach((values: Rule[], j: number) => {
          const remove: number = values.findIndex((r: Rule) => r === found)
          possibilities[j].splice(remove, 1);
        })
      }
    })
  }
  console.log(possibilities);
};

// part1();
part2();
