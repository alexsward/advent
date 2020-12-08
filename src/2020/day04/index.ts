import * as fs from 'fs';

type Field = 'byr' | 'iyr' | 'eyr' | 'hgt' | 'hcl' | 'ecl' | 'pid' | 'cid';

export type Passport = Record<Field, string>;

const passports = (filename: string): Partial<Passport>[] => {
  return fs.readFileSync(filename, "utf8").split(/\n\r?\n/) // split on double whitespace to get raw data
      .map((fields: string) => fields.split(/\s+/g)) // split on whitespace into key:value pairs
      .map((pairs: string[]) => {
        return pairs.reduce((pp: Partial<Passport>, pair: string) => {
          const [k, v] = pair.split(":"); // no type annotation because technically could be more than 2 items (it's not)
          if (k == '') return pp;
          pp[k as Field] = v;
          return pp;
        }, {} as Partial<Passport>);
      });
}

export const validate = (passport: Partial<Passport>, values: boolean = false): boolean => {
  let keys: string[] = Object.keys(passport);
  if (keys.length == 8) {
    return values ? validateValues(passport) : true
  } else if (keys.length == 7) {
    let correctKeys: boolean = keys.findIndex((key: string) => key === 'cid') === -1;
    return correctKeys && (values ? validateValues(passport) : true);
  }
  return false;
}

export const validateValues = (passport: Partial<Passport>): boolean =>
    Object.entries(passport).map((entry: [string, string | undefined]) => {
      if (entry[1] == undefined) return false;
      let validator: (value: string) => boolean = validators[entry[0] as Field];
      return (validator == undefined) ? false : validator(entry[1]);
    })
    .filter((valid) => !valid)
    .length == 0;

const toInt = (v: string): number | undefined => {
  const number: number | undefined = parseInt(v);
  return isNaN(number) ? undefined : number;
}

const between = (number: number | undefined, low: number, high: number): boolean =>
    (number === undefined) ? false : (low <= number && number <= high);

export const validators: Record<Field, (value: string) => boolean> = {
  byr: (value: string) => between(toInt(value), 1920, 2002),
  iyr: (value: string) => between(toInt(value), 2010, 2020),
  eyr: (value: string) => between(toInt(value), 2020, 2030),
  hcl: (value) => /^#[a-fA-F0-9]{6}/.test(value),
  ecl: (value) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].find((color: string) => value == color) != undefined,
  pid: (value) => /^[0-9]{9}$/.test(value),
  hgt: (value) => {
    if (value.endsWith("cm")) return between(toInt(value.split("cm")[0]), 150, 193)
    else if (value.endsWith("in")) return between(toInt(value.split("in")[0]), 59, 76)
    else return false
  },
  cid: (_) => true,
};

console.log("part1:", passports("src/2020/day04/input").filter((passport) => validate(passport)).length);
console.log("part2:", passports("src/2020/day04/input").filter((passport) => validate(passport, true)).length);
