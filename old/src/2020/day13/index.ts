const input: string = "1007125\n13,x,x,41,x,x,x,x,x,x,x,x,x,569,x,29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,23,x,x,x,x,x,x,x,937,x,x,x,x,x,37,x,x,x,x,x,x,x,x,x,x,17";
const input2: string = "939\n7,13,x,x,59,x,31,19";

const part1 = (): void => {
  const lines: string[] = input.split("\n");
  const arrival: number = parseInt(lines[0], 10);
  const answer: [number, number] = lines[1].split(",")
    .filter((bus: string) => bus !== "x")
    .map((bus: string) => parseInt(bus, 10))
    .map((bus: number) => [bus, (arrival - (arrival % bus)) + bus] as [number, number])
    .reduce((earliest: [number, number], bus: [number, number]) => { // [bus, delta]
      if (earliest[0] === 0) {
        return bus
      }
      return (earliest[1] < bus[1]) ? earliest : bus
    }, [0, 0]);
  console.log("part1:", answer[0] * (answer[1] - arrival)); // bus * minutes to wait
};

const part2 = (): void => {
  const lines: string[] = input.split("\n");
  const constraints: number[][] = lines[0].split(",") // bus -> minutes
    .map((v: string, idx: number) => [parseInt(v, 10), idx])
    .sort((x, y) => x[0] - y[0])
   // pretty sure this is an application of the chinese remainder theorem. too bad my math sucks now.
};

part1();

export {};
