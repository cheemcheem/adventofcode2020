const day04FileName = "day-04.txt";


const day4part1 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const input = await readFile(path.join(day04FileName)).toString();

  return {part: 1, input};
}

day4part1().then(console.log);

const day4part2 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const input = await readFile(path.join(day04FileName)).toString();

  return {part: 2, input};
}

day4part2().then(console.log);

