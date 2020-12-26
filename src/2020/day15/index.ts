const str: string = "18,8,0,5,4,1,20";

const turns = (numbers: number[]): void => {
  let seen: Map<number, [number, number?]> = numbers.reduce((m: Map<number, [number, number?]>, n: number, i: number) => m.set(n, [1, i]), new Map<number, [number, number?]>());
  let sequence: number[] = numbers.slice(0);
  let previous: number = sequence[numbers.length - 1];
  for (let i: number = 0; i < 2020 - numbers.length; i++) {
    let next: number;
  }
};

console.log(turns([0,3,6]));
