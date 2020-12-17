import {Day, ERROR_MESSAGE} from "../common";

export default class Day8 extends Day {

  private readonly input: string[] = [];
  private readonly visited: boolean[] = [];

  protected readonly dayNumber = 8;

  private loadVisited = async () => {
    while (this.input.length > 0) {
      this.input.pop();
    }
    while (this.visited.length > 0) {
      this.visited.pop();
    }

    this.getSplitString().forEach(input => {
      this.input.push(input);
      this.visited.push(false);
    });
  }

  part1 = async () => {
    await this.loadVisited();
    return {part: 1, answer: this.getFinalAccBeforeLoop()};
  }

  private getFinalAccBeforeLoop() {
    let index = 0;
    let acc = 0;
    while (index < this.input.length) {
      if (this.visited[index]) {
        break;
      }
      this.visited[index] = true;

      const item = this.input[index];

      const split = item.split(" ");
      const instr = split[0];
      const value = Number(split[1]);

      if (instr === "nop") {
        index++;
        continue;
      }

      if (instr === "acc") {
        acc += value;
        index++;
        continue;
      }

      if (instr === "jmp") {
        index += value;
        continue;
      }

      throw ERROR_MESSAGE;
    }
    return acc;
  }

  part2 = async () => {
    await this.loadVisited();
    const maxLength = this.input.length;
    let answer = 0;

    for (
        let changedIndex = 0;
        changedIndex < maxLength && !this.visited[maxLength - 1];
        changedIndex++
    ) {
      await this.loadVisited();
      const indexValue = this.input[changedIndex];

      if (indexValue.startsWith("acc")) continue;

      if (indexValue.startsWith("nop")) {
        this.input[changedIndex] = indexValue.replace("nop", "jmp");
      } else {
        this.input[changedIndex] = indexValue.replace("jmp", "nop");
      }

      answer = (await this.getFinalAccBeforeLoop());

    }
    return {part: 2, answer};
  }

}