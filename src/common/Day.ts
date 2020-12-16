import {ERROR_MESSAGE} from ".";
import NumberFormat = Intl.NumberFormat;

export abstract class Day {
  protected fileString?: string;
  private readonly dayNumber: number;

  protected constructor(day: number) {
    this.dayNumber = day;
  }

  async init() {
    const path = await import("path");
    const {promises} = await import("fs");
    const {readFile} = promises;
    this.fileString = (await readFile(path.join(__dirname, `../inputs/day-${
        new NumberFormat(undefined, {minimumIntegerDigits: 2}).format(this.dayNumber)
    }.txt`))).toString();
    return this;
  }

  abstract part1(): Promise<any>

  abstract part2(): Promise<any>

  protected getString() {
    if (this.fileString) return this.fileString;
    throw ERROR_MESSAGE;
  }

  protected getSplitString() {
    return this.getString().split("\n");
  }

  protected getDoubleSplitString() {
    return this.getString().split("\n\n");
  }

}