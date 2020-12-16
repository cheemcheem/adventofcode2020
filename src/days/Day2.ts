import {Day} from "../common";

export default class Day2 extends Day {

  constructor() {
    super(2);
  }

  part1 = async () => {
    const fileRows = this.getSplitString();

    let count = fileRows.map(row => {
      const split = row.split(": ");
      return {rule: split[0], password: split[1]};
    })
    .map(({rule, password}) => {
      const splitSpace = rule.split(" ");
      const splitDash = splitSpace[0].split("-");
      const min = Number(splitDash[0]);
      const max = Number(splitDash[1]);
      const letter = splitSpace[1];
      return {rule: {min, max, letter}, password};
    })
    .filter(({rule: {min, max, letter}, password}) => {
      let letterCount = 0;
      for (const passwordLetter of password) {
        if (passwordLetter === letter) {
          letterCount++;
        }
      }
      return letterCount >= min && letterCount <= max;
    })
        .length;
    return {part: 1, count, total: fileRows.length};
  }


  part2 = async () => {
    const fileRows = this.getSplitString();


    let count = fileRows.map(row => {
      const split = row.split(": ");
      return {rule: split[0], password: split[1]};
    })
    .map(({rule, password}) => {
      const splitSpace = rule.split(" ");
      const splitDash = splitSpace[0].split("-");
      const indexA = Number(splitDash[0]) - 1;
      const indexB = Number(splitDash[1]) - 1;
      const letter = splitSpace[1];
      return {rule: {indexA, indexB, letter}, password};
    })
    .filter(({rule: {indexA, indexB, letter}, password}) => {
      const aMatches = password[indexA] === letter;
      const bMatches = password[indexB] === letter;
      return aMatches ? !bMatches : bMatches;
    })
        .length;
    return {part: 2, count, total: fileRows.length};
  }
}
