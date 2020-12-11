import * as fs from 'fs';

type Time = {
  month: number,
  day: number,
  year: number,
  hour: number,
  minute: number,
};

type Event = 'begins shift' | 'wakes up' | 'falls asleep';

type Log = {
  time: Time,
  guard: number | undefined,
  event: Event,
}

const parseLog = (line: string): Log => {
  const c: RegExpMatchArray | null = line.match(/\[([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2})]\ (.*$)/);
  if (c == null) {
    throw new Error("Invalid event: " + line);
  }
  let event: Event = "begins shift";
  let guard: number | undefined = undefined;
  switch (c[6]) {
    case "wakes up":
      event = "wakes up"
      break;
    case "falls asleep":
      event = "falls asleep"
      break;
    default:
      const m: RegExpMatchArray | null = c[6].match(/\#(\d+)/);
      if (m == null) throw new Error("Invalid event: " + line);
      guard = parseInt(m[0], 10);
  }
  return {
    time: {
      year: parseInt(c[0], 10),
      month: parseInt(c[1], 10),
      day: parseInt(c[2], 10),
      hour: parseInt(c[3], 10),
      minute: parseInt(c[4], 10),
    },
    guard: guard,
    event: event,
  };
};

const compare = (l1: Log, l2: Log): number => {
  return 0;
}

const part1 = (): void => {
  const log: Log[] = fs.readFileSync("src/2018/day04/input", "utf8")
      .split("\n").filter((line: string) => line.length > 0)
      .map((line: string) => parseLog(line))
      .sort(compare)
}

part1();
