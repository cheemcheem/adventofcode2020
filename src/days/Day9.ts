import {Day, ERROR_MESSAGE} from "../common";

export default class Day9 extends Day {

  protected readonly dayNumber = 9;

  part1 = async () => {
    const {input, preambleLength} = this.parseInput();

    for (let current = preambleLength; current < input.length; current++) {
      const currentValue = input[current];
      let found = false;

      for (let i = current - preambleLength; i < current; i++) {
        for (let j = i + 1; j < current; j++) {
          const iValue = input[i];
          const jValue = input[j];

          if (iValue + jValue === currentValue) {
            found = true;
            break;
          }
        }

        if (found) break;
      }

      if (!found) {
        return currentValue;
      }
    }

    throw ERROR_MESSAGE;
  }

  private parseInput = () => {
    const [preambleLengthString, ...input] = this.getSplitString().map(Number);
    const preambleLength = Number(preambleLengthString);
    return {input, preambleLength};
  }

  part2 = async () => {
    const {input} = this.parseInput();
    const targetNumber = await this.part1();

    for (let i = 0; i < input.length; i++) {
      const j = i + 1;

      const iValue = input[i];
      const jValue = input[j];
      if (iValue + jValue === targetNumber) {
        return targetNumber;
      }

      const indices = [iValue, jValue];
      for (let k = j + 1; k < input.length; k++) {
        indices.push(input[k]);
        const totalSoFar = indices.reduce((a, b) => a + b);
        if (totalSoFar === targetNumber) {
          return Math.min(...indices) + Math.max(...indices);
        }
        if (totalSoFar > targetNumber) {
          break;
        }
      }

    }
    throw ERROR_MESSAGE;
  }

}