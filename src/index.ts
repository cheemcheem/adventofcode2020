import yargs from 'yargs/yargs'
import {Day, ERROR_MESSAGE} from "./common";
import * as Days from './days';

class Index {
  private static readonly DAYS = Object.values(Days);

  main(args?: string[]) {
    const result = yargs(args)
        .options({
          day: {
            type: 'number',
            optional: true,
            nullable: false,
            describe: 'Run a day in the advent of code.',
            alias: 'd',
            choices: Index.DAYS.map((_, index) => index + 1),
          },
          part: {
            type: 'number',
            optional: true,
            describe: 'Run part 1 or part 2 of a day.',
            alias: 'p',
            choices: [1, 2],
          },
          latest: {
            optional: true,
            describe: 'Run latest day.',
            conflicts: 'day',
            alias: 'l',
          },
          example: {
            type: 'number',
            optional: true,
            describe: 'Run example 1 or example 2 for the given day.',
            alias: 'e',
            choices: [1, 2],
          }
        })
        .version(false)
        .check((argv) => {
          if (argv.part && !(argv.day || argv.latest)) {
            throw new Error("Can't provide part option without providing day or latest option as well.")
          }

          if (Object.keys(argv).includes("day") && !argv.day) {
            throw new Error("Can't provide empty day option.")
          }

          if (Object.keys(argv).includes("part") && !argv.part) {
            throw new Error("Can't provide empty part option.")
          }

          if (Object.keys(argv).includes("example") && !argv.example) {
            throw new Error("Can't provide empty example.")
          }

          return true;

        })
        .help()
        .usage('$0 run')
        .usage('$0 run -e [example]')
        .usage('$0 run -d [day]')
        .usage('$0 run -d [day] -e [example]')
        .usage('$0 run -d [day] -p [part]')
        .usage('$0 run -d [day] -p [part] -e [example]')
        .usage('$0 run -l')
        .usage('$0 run -l -e [example]')
        .showHelpOnFail(true, "This can't be run with these options.")
        .parse()
    ;

    if (!result) return;

    const part = result.part as 1 | 2 | undefined;
    const example = result.example as 1 | 2 | undefined;

    result.latest ? this.runOne(Index.DAYS.length, part, example)
        : result.day ? this.runOne(result.day, part, example)
        : this.runAll(example)
    ;

  }

  async runAll(example?: 1 | 2) {
    const puzzles = await Promise.all(
        Index.DAYS
        .map(async a => await new a() as Day)
        .map(async a => (await a).init(example))
    );

    const solutions = await Promise.all(
        puzzles.flatMap(a => [a.part1(), a.part2()])
    );

    solutions.map(
        async (parts, day) => {
          const solution = await parts
          console.log({
            day: Math.floor(day / 2) + 1,
            solution
          })
        }
    );
  }

  async runOne(dayNumber: number, part?: 1 | 2, example?: 1 | 2) {
    if (dayNumber > Index.DAYS.length) {
      throw ERROR_MESSAGE;
    }

    const day = await new Index.DAYS[dayNumber - 1]().init(example);

    console.log({
      day: dayNumber,
      solution: [
        (!part || part === 1) && await day.part1(),
        (!part || part === 2) && await day.part2()
      ]
    })
  }
}

new Index().main(process.argv);