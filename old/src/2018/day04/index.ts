import * as fs from 'fs';
import { reducePairs } from '../../lib/fx';

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
      guard = parseInt(m[1], 10);
  }
  return {
    time: {
      year: parseInt(c[1], 10),
      month: parseInt(c[2], 10),
      day: parseInt(c[3], 10),
      hour: parseInt(c[4], 10),
      minute: parseInt(c[5], 10),
    },
    guard: guard,
    event: event,
  };
};

const compareLogs = (l1: Log, l2: Log): number => {
  const t1: Time = l1.time, t2: Time = l2.time;
  if (t1.year - t2.year !== 0) {
    return t1.year - t2.year;
  } else if (t1.month - t2.month !== 0) {
    return t1.month - t2.month;
  } else if (t1.day - t2.day !== 0) {
    return t1.day - t2.day;
  } else if (t1.hour - t2.hour !== 0) {
    return t1.hour - t2.hour;
  } else if (t1.minute - t2.minute !== 0) {
    return t1.minute - t2.minute;
  }
  return 0
};

type Group = {
  guard: number,
  total: number,
  minutes: number[], // array of length 60
};

const grouping = (log: Log[]): void => {
  let curr: number = 0;
  let gs: Map<number, Log[]> = log.reduce((m: Map<number, Log[]>, log: Log) => {
    console.log("log:", log);
    if (log.guard !== undefined) {
      m.set(log.guard || 0, []);
      curr = log.guard;
    }
    (m.get(curr) || []).push(log);
    return m;
  }, new Map<number, Log[]>())
  Array.from(gs.entries()).reduce((guards: Group[], g: [number, Log[]]) => {
    reducePairs(log, (minutes: number[], l1: Log, l2: Log) => {
      return minutes;
    }, [] as number[])
    guards.push({
      guard: g[0],
      total: 0,
      minutes: [],
    })
    return guards
  }, []);
};

const part1 = (): void => {
  const log: Log[] = fs.readFileSync("src/2018/day04/input", "utf8")
      .split("\n").filter((line: string) => line.length > 0)
      .map((line: string) => parseLog(line))
      .sort(compareLogs);
  grouping(log);
}

part1();
