const day05FileName = "day-05.txt";


const day5part1 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const input = (await readFile(path.join(day05FileName))).toString();
  const seats = input.split("\n");
  const solution = seats.map(seat => ({
    row: Number.parseInt(
        seat.substring(0, 7)
        .replaceAll("F", "0")
        .replaceAll("B", "1"),
        2
    ),
    col: Number.parseInt(
        seat.substring(7, 10)
        .replaceAll("L", "0")
        .replaceAll("R", "1"),
        2
    )
  }))
  .map(({row, col}) => ({row, col, id: (row * 8) + col}))
  .reduce((a, b) => a.id > b.id ? a : b);

  return {part: 1, solution};
}

day5part1().then(console.log);

const day5part2 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const input = (await readFile(path.join(day05FileName))).toString();
  const seats = input.split("\n");
  const orderedIds = seats.map(seat => ({
    row: Number.parseInt(
        seat.substring(0, 7)
        .replaceAll("F", "0")
        .replaceAll("B", "1"),
        2
    ),
    col: Number.parseInt(
        seat.substring(7, 10)
        .replaceAll("L", "0")
        .replaceAll("R", "1"),
        2
    )
  }))
  .map(({row, col}) => (row * 8) + col)
  .sort((a, b) => a > b ? 1 : -1);

  const minId = orderedIds[0];
  const maxId = orderedIds[orderedIds.length - 1];

  for (let id = minId + 1; id < maxId - 1; id++) {
    const idIndex = orderedIds.indexOf(id);
    if (idIndex === -1) {
      return {part: 2, solution: id};
    }
  }

  return {part: 2, solution: "404 advent of code broken"};
}
day5part2().then(console.log);

