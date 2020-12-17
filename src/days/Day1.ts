import {Day, ERROR_MESSAGE} from "../common";

export default class Day1 extends Day {

  protected readonly dayNumber = 1;

  part1 = async () => {
    const expenses = this.getSplitString().map(Number);

    for (const i of expenses) {
      for (const j of expenses) {
        if (i === j) continue;
        if (i + j === 2020) {
          return {part: 1, i, j, multiply: i * j};
        }
      }
    }
    throw ERROR_MESSAGE;
  };


  part2 = async () => {
    const expenses = this.getSplitString().map(Number);

    for (const i of expenses) {
      for (const j of expenses) {
        if (i === j) continue;
        for (const k of expenses) {
          if (j === k) continue;
          if (i + j + k === 2020) {
            return {part: 2, i, j, k, multiply: i * j * k};
          }
        }
      }
    }
    throw ERROR_MESSAGE;
  };
}