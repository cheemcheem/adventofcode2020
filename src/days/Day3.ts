import {Day} from "../common";

class TreeMap {
  private readonly map: string[];
  private readonly width: number;
  private readonly height: number;

  constructor(map: string) {
    this.map = map.split("\n");
    this.width = this.map[0].length;
    this.height = this.map.length;
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

  private treeAt = ({x, y}: { x: number, y: number }) => {
    const translatedX = x % this.width || 0;
    // console.log({x, y, translatedX});
    return this.map[y][translatedX] === '#';
  }
}

export default class Day3 extends Day {

  protected readonly dayNumber = 3;

  part1 = async () => {
    const map = new TreeMap(this.getString());
    return map.traverse({xDiff: 3, yDiff: 1});
  }

  part2 = async () => {
    const map = new TreeMap(this.getString());
    const slopes = [
      {xDiff: 1, yDiff: 1},
      {xDiff: 3, yDiff: 1},
      {xDiff: 5, yDiff: 1},
      {xDiff: 7, yDiff: 1},
      {xDiff: 1, yDiff: 2}
    ];
    return slopes.map(map.traverse).reduce((a, b) => a * b);
  }

}

