import {Day} from "../common";

export default class Day10 extends Day {

  protected readonly dayNumber = 10;

  private getJolts = () => {
    const jolts = [
      0,
      ...this.getSplitString().map(s => Number(s)).sort((a, b) => a > b ? 1 : -1)
    ];
    jolts.push(jolts[jolts.length - 1] + 3);
    return jolts;
  }

  part1 = async () => {
    const jolts = this.getJolts();

    const diffMap = new Map<number, number>();
    for (let i = 0; i < jolts.length - 1; i++) {
      const iValue = jolts[i];
      const jValue = jolts[i + 1];
      const diff = jValue - iValue;
      diffMap.set(diff, 1 + (diffMap.get(diff) ?? 0));
    }

    return (diffMap.get(3) ?? 0) * (diffMap.get(1) ?? 0);
  }

  private part2Tree = (
      jolts: number[],
      treeMap: Map<number, number> = new Map<number, number>(),
      index: number = 0
  ): number => {

    if ((jolts.length - index) < 4) {
      return 1;
    }

    const existingAnswer = treeMap.get(index);
    if (existingAnswer) {
      return existingAnswer;
    }

    let answer = this.part2Tree(jolts, treeMap, index + 1);

    const i = jolts[index];
    const k = jolts[index + 2];
    const l = jolts[index + 3];

    if (k - i <= 3) {
      answer += this.part2Tree(jolts, treeMap, index + 2);
    }

    if (l - i <= 3) {
      answer += this.part2Tree(jolts, treeMap, index + 3);
    }

    treeMap.set(index, answer);
    return answer;
  }

  part2 = async () => this.part2Tree(this.getJolts())

}