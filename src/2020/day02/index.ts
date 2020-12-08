import * as fs from 'fs';

// OccuranceRule is a rule that requires between a minimum and maximum number of occurances of a character
type OccuranceRule = {
  kind: 'occurance',
  character: string,
  min: number,
  max: number,
}

// PositionRule is a rule that requires a character to hit at one position OR the other, but not both
type PositionRule = {
  kind: 'position',
  character: string,
  first: number,
  second: number,
}

type RuleKind = 'position' | 'occurance';

type Rule = (OccuranceRule | PositionRule) & {
  kind: RuleKind,
};

type Test = {
  rule: Rule
  password: string,
  valid: boolean | null,
}

// RuleParser takes a raw line and returns a Rule
type RuleParser = (raw: string) => Rule;

const getOccuranceRule = (raw: string): OccuranceRule => {
  const parts: string[] = raw.split(" ");
  const minMax: number[] = parts[0].split("-").map((x) => parseInt(x, 10));
  return {
    kind: 'occurance',
    character: parts[1],
    min: minMax[0],
    max: minMax[1],
  }
}

const getPositionRule = (raw: string): PositionRule => {
  const parts: string[] = raw.split(" ");
  const spots: number[] = parts[0].split("-").map((x) => parseInt(x, 10));
  return {
    kind: 'position',
    character: parts[1],
    first: spots[0],
    second: spots[1],
  }
}

const evaluateTest = (test: Test): boolean => {
  var rule: Rule;
  switch (test.rule.kind) {
    case 'position':
      rule = test.rule as PositionRule;
      const first = test.password[rule.first - 1] === rule.character;
      const second = test.password[rule.second - 1] === rule.character;
      return (first || second) && !(first && second);
    case 'occurance':
      rule = test.rule as OccuranceRule;
      const found: number = test.password.split("").filter((c) => c === rule.character).length;
      return test.rule.min <= found && found <= test.rule.max;
  }
}

const getTests = (filename: string, parser: RuleParser): Test[] =>
    fs.readFileSync(filename, "utf8").split("\n")
      .filter((line: string) => line.length > 0)
      .map((line: string) => line.split(":"))
      .map((parts: string[]) => {
        return {
          rule: parser(parts[0]),
          password: parts[1].trim(),
          valid: null,
        };
      });


const getParser = (kind: RuleKind): RuleParser => {
  switch (kind) {
    case 'occurance':
      return getOccuranceRule;
    case 'position':
      return getPositionRule;
  }
}

const solution = (kind: RuleKind): number => {
  return getTests("src/2020/day02/input", getParser(kind))
      .map((test) => {
        test.valid = evaluateTest(test);
        return test;
      })
      .filter((result: Test) => result.valid)
      .length
}

console.log("part1:", solution('occurance'));
console.log("part2:", solution('position'));
