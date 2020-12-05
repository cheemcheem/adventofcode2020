const day03FileName = "day-03.txt";

class TreeMap {
  private readonly map: string[];
  private readonly width: number;
  private readonly height: number;

  constructor(map: string) {
    this.map = map.split("\n");
    this.width = this.map[0].length;
    this.height = this.map.length;
  }

  private treeAt = ({x, y}: { x: number, y: number }) => {
    const translatedX = x % this.width || 0;
    // console.log({x, y, translatedX});
    return this.map[y][translatedX] === '#';
  }

  traverse = ({xDiff, yDiff}: { xDiff: number, yDiff: number }) => {
    const coords = {x: 0, y: 0};
    let treesHit = 0;
    while (coords.y < this.height) {
      this.treeAt(coords) && treesHit++;
      coords.x += xDiff;
      coords.y += yDiff;
    }
    return treesHit;
  }
}

const day3part1 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const map = new TreeMap((await readFile(path.join(day03FileName))).toString());

  return {part: 1, count: map.traverse({xDiff: 3, yDiff: 1})};
}

day3part1().then(console.log);

const day3part2 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const map = new TreeMap((await readFile(path.join(day03FileName))).toString());
  const slopes = [
    {xDiff: 1, yDiff: 1},
    {xDiff: 3, yDiff: 1},
    {xDiff: 5, yDiff: 1},
    {xDiff: 7, yDiff: 1},
    {xDiff: 1, yDiff: 2}
  ];
  return {part: 2, count: slopes.map(map.traverse).reduce((a, b) => a * b)};
}

day3part2().then(console.log);

