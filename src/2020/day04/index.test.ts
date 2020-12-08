import { validateValues, validators, validate, Passport } from './index';

test('byr validator', () => {
  expect(validators.byr("1919")).toBe(false);
  expect(validators.byr("1920")).toBe(true);
  expect(validators.byr("2002")).toBe(true);
  expect(validators.byr("2003")).toBe(false);
  expect(validators.byr("abc")).toBe(false);
});

test('hcl validator', () => {
  expect(validators.hcl("foo")).toBe(false);
  expect(validators.hcl("ABCDEF")).toBe(false);
  expect(validators.hcl("abcdef")).toBe(false);
  expect(validators.hcl("123456")).toBe(false);
  expect(validators.hcl("123")).toBe(false);
  expect(validators.hcl("#123ABC")).toBe(true);
  expect(validators.hcl("#123abc")).toBe(true);
  expect(validators.hcl("#123")).toBe(false);
});

test('pid validator', () => {
  expect(validators.pid("123456789")).toBe(true);
  expect(validators.pid("000056789")).toBe(true);
  expect(validators.pid("ABC123456")).toBe(false);
});

test('hgt validator', () => {
  expect(validators.hgt("160cm")).toBe(true);
  expect(validators.hgt("65in")).toBe(true);
});

test('cid validator', () => {
  expect(validators.cid("anything")).toBe(true);
})

test('validateValues', () => {
  let pp: Partial<Passport> = { byr: "1960", iyr: "2015", eyr: "2025", pid: "123456789", hcl: "#abc123", ecl: "amb", hgt: "160cm" };
  expect(validateValues(pp)).toBe(true);
  pp["byr"] = "1860";
  expect(validateValues(pp)).toBe(false);
});

test('validate', () => {
  let pp: Partial<Passport> = { byr: "1960", iyr: "2015", eyr: "2025", pid: "123456789", hcl: "#abc123", ecl: "amb", hgt: "160cm" };
  expect(validate(pp, false)).toBe(true);
  expect(validate(pp, true)).toBe(true);
  // has 7 fields, but not missing cid
  let ppInvalid7: Partial<Passport> = { byr: "1960", iyr: "2015", eyr: "2025", pid: "123456789", hcl: "#abc123", cid: "amb", hgt: "160cm" };
  expect(validate(ppInvalid7, true)).toBe(false);
});
