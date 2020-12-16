import {Day} from "../common";

export default class Day6 extends Day {

  constructor() {
    super(6);
  }

  part1 = async () => {
    const solution = this.getDoubleSplitString()
        .map(group => new Set(group.replaceAll("\n", "").split("")).size)
        .reduce((groupA, groupB) => groupA + groupB)
    ;

    return {part: 1, solution};
  }


  part2 = async () => {
    const solution = this.getDoubleSplitString()
        .map(group => group
            .split("\n")
            .map(person => person.split(""))
            .reduce((personA, personB) => personA.filter(a => personB.includes(a))).length
        )
        .reduce((groupA, groupB) => groupA + groupB)
    ;

    return {part: 2, solution};
  }
}

