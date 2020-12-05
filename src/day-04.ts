const day04FileName = "day-04.txt";


const day4part1 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const input = (await readFile(path.join(day04FileName))).toString();

  const passports = input.split("\n\n");
  const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const converted = passports
  .map(passport => passport
      .split(/([\n ])/)
      .filter(detail => detail !== '\n' && detail !== ' ')
  )
  .map(passport => {
    const mapped = passport.map(detail => {
      const split = detail.split(":");
      const val: Record<string, string> = {};
      val[split[0]] = split[1];
      return val;
    });
    return mapped.reduce((a, b) => ({...a, ...b}));
  })
  .filter(passport => {
    const properties = Object.getOwnPropertyNames(passport);
    return required.every(property => properties.includes(property));
  })
      .length
  return {part: 1, converted};
}

day4part1().then(console.log);

const day4part2 = async () => {
  const path = await import("path");
  const {promises} = await import("fs");
  const {readFile} = promises;
  const input = (await readFile(path.join(day04FileName))).toString();

  const passports = input.split("\n\n");
  const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  interface RequiredType {
    byr: string,
    iyr: string,
    eyr: string,
    hgt: string,
    hcl: string,
    ecl: string,
    pid: string,
    cid?: string
  }

  const converted = passports
  .map(passport => passport
      .split(/([\n ])/)
      .filter(detail => detail !== '\n' && detail !== ' ')
  )
  .map(passport => {
    const mapped = passport.map(detail => {
      const split = detail.split(":");
      const val: Record<string, string> = {};
      val[split[0]] = split[1];
      return val;
    });
    return mapped.reduce((a, b) => ({...a, ...b})) as unknown as RequiredType;
  })
  .filter(passport => {
    const properties = Object.getOwnPropertyNames(passport);
    return required.every(property => properties.includes(property));
  })
  .filter(({byr, iyr, eyr, hgt, hcl, ecl, pid}: RequiredType) => {
    if (byr.match(/^\d{4}$/) === null) {
      return false;
    }
    const byrNum = Number(byr);
    if (byrNum < 1920 || byrNum > 2002) {
      return false;
    }

    if (iyr.match(/^\d{4}$/) === null) {
      return false;
    }
    const iyrNum = Number(iyr);
    if (iyrNum < 2010 || iyrNum > 2020) {
      return false;
    }

    if (eyr.match(/^\d{4}$/) === null) {
      return false;
    }
    const eyrNum = Number(eyr);
    if (eyrNum < 2020 || eyrNum > 2030) {
      return false;
    }

    if (hgt.match(/^\d+(cm|in)$/) === null) {
      return false;
    }
    const hgtCm = hgt.includes("cm");
    const hgtNum = Number(hgt.split(hgtCm ? "cm" : "in")[0]);
    if (hgtCm
        ? (hgtNum < 150 || hgtNum > 193)
        : (hgtNum < 59 || hgtNum > 76)) {
      return false;
    }

    if (hcl.match(/^#[0-9a-f]{6}$/) === null) {
      return false;
    }

    if (ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/) === null) {
      return false;
    }

    if (pid.match(/^\d{9}$/) === null) {
      return false;
    }

    return true;
  }).length
  return {part: 2, converted, total: passports.length};
}
day4part2().then(console.log);

