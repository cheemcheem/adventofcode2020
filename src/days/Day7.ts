import {Day} from "../common";

export default class Day7 extends Day {

  private readonly bagMap = new Map<string, { colour: string, count: number }[]>();

  protected readonly dayNumber = 7;


  loadBagMap = async () => {
    const splitString = this.getSplitString();

    splitString.forEach(line => {
      let [parentColour, childColours] = line.split(" bags contain ");
      childColours = childColours.replaceAll(".", "");

      if (childColours === "no other bags") {
        this.bagMap.set(parentColour, []);

      } else {
        this.bagMap.set(
            parentColour,
            childColours.replaceAll(/( bag(s?))/g, "")
            .split(", ")
            .map(childColour => {
              const count = Number(childColour.split(" ")[0]);
              const colour = childColour.split(`${count} `)[1];
              return {colour, count};
            })
        )

      }
    })
  }

  countBagsThatContainInputColour = (inputColour: string) => {
    let count = 0;

    this.bagMap.forEach((childBags) => {
      const hasMatch = childBags
      .map(({colour}) => {
        if (colour === inputColour) return true;
        return this.countBagsThatContainInputColourInColour(inputColour, colour);
      })
      .reduce((a, b) => a || b, false);

      hasMatch && count++;
    })

    return count;
  }

  countBagsThatContainInputColourInColour = (inputColour: string, colour: string): boolean => {
    return this.bagMap
    .get(colour)!
    .map(({colour: childColour}) => {
      if (childColour === inputColour) return true;
      return this.countBagsThatContainInputColourInColour(inputColour, childColour);
    })
    .reduce((a, b) => a || b, false);
  }

  part1 = async () => {
    await this.loadBagMap();

    const input = "shiny gold";

    return this.countBagsThatContainInputColour(input);
  }

  countBagsInsideInputColour = (inputColour: string): number => {
    const inputColourBags = this.bagMap.get(inputColour);

    if (!inputColourBags) {
      return 0
    }

    return inputColourBags
    .map(({colour, count}) => count * (1 + this.countBagsInsideInputColour(colour)))
    .reduce((a, b) => a + b, 0);

  }

  part2 = async () => {
    await this.loadBagMap();

    const input = "shiny gold";

    return this.countBagsInsideInputColour(input);
  }

}
