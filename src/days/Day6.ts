import {Day} from "../common";

export default class Day6 extends Day {

  protected readonly dayNumber = 6;

  part1 = async () => {
    return this.getDoubleSplitString()
    .map(group => new Set(group.replaceAll("\n", "").split("")).size)
    .reduce((groupA, groupB) => groupA + groupB);
  }


  part2 = async () => {
    return this.getDoubleSplitString()
    .map(group => group
        .split("\n")
        .map(person => person.split(""))
        .reduce((personA, personB) => personA.filter(a => personB.includes(a))).length
    )
    .reduce((groupA, groupB) => groupA + groupB);
  }
}

