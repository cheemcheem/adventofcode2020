import {Day} from "../common";

export default class Day5 extends Day {

  protected readonly dayNumber = 5;

  part1 = async () => {
    const seats = this.getSplitString();
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

  part2 = async () => {
    const seats = this.getSplitString();
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
}
