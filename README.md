# adventofcode2020
https://adventofcode.com/2020

### Example Usage
##### set up
```shell script
$ npm install
```

##### run all days
```shell script
$ npm start
```

##### run the latest day
```shell script
$ npm start -- -- -l
```

##### run the example for a specific part of a specific day
```shell script
$ npm start -- -- -d 1 -p 2 -e
```


##### help output
```shell script
$ npm start -- -- --help

index.ts run
index.ts run -e
index.ts run -d [day]
index.ts run -d [day] -e
index.ts run -d [day] -p [part]
index.ts run -d [day] -p [part] -e
index.ts run -l
index.ts run -l -e

Options:
  -d, --day      Run a day in the advent of code.
                                   [number] [choices: 1, 2, 3, 4, 5, 6, 7, 8, 9]
  -p, --part     Run part 1 or part 2 of a day.         [number] [choices: 1, 2]
  -l, --latest   Run latest day.
  -e, --example  Run example input rather than real input for the given
                 part/day.
      --help     Show help                                             [boolean]
```