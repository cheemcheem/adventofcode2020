const day01FileName = "day-01.txt"

const day01part1 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const fileRows = (await readFile(path.join(day01FileName))).toString().split("\n");
  const expenses = fileRows.map(Number);
  for (const i of expenses) {
    for (const j of expenses) {
      if (i === j) continue;
      if (i + j === 2020) {
        return {part:1,i, j, multiply: i * j};
      }
    }
  }
  throw "404 advent of code broken";
};

day01part1().then(console.log).catch(console.error);


const day01part2 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const fileRows = (await readFile(path.join(day01FileName))).toString().split("\n");
  const expenses = fileRows.map(Number);
  for (const i of expenses) {
    for (const j of expenses) {
      if (i === j) continue;
      for (const k of expenses) {
        if (j === k) continue;
        if (i + j + k === 2020) {
          return {part:2,i, j, k, multiply: i * j * k};
        }
      }
    }
  }
  throw "404 advent of code broken";
};

day01part2().then(console.log).catch(console.error);