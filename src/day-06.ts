const day06FileName = "day-06.txt";


const day6part1 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const input = (await readFile(path.join(day06FileName))).toString();

  const solution = input.split("\n\n")
      .map(group => new Set(group.replaceAll("\n", "").split("")).size)
      .reduce((groupA, groupB) => groupA + groupB)
  ;

  return {part: 1, solution};
}

day6part1().then(console.log);

const day6part2 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const input = (await readFile(path.join(day06FileName))).toString();

  const solution = input.split("\n\n")
      .map(group => group
          .split("\n")
          .map(person => person.split(""))
          .reduce((personA, personB) => personA.filter(a => personB.includes(a))).length
      )
      .reduce((groupA, groupB) => groupA + groupB)
  ;

  return {part: 2, solution};
}
day6part2().then(console.log);

