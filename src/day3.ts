import fs from "fs";
import readline from "readline";

function mul(str: string) {
  const match = str.match(/mul\((\d{1,3}),(\d{1,3})\)/);

  return parseInt(match![1]) * parseInt(match![2]);
}

const inputStream = fs.createReadStream("./src/day3.input");
const lineReader = readline.createInterface({ input: inputStream });

let matches: string[] = [];

lineReader.on("line", (line) => {
  matches = matches.concat(line.match(/mul\(\d{1,3},\d{1,3}\)|do(?:n't)?\(\)/g)!);
});

lineReader.on("close", () => {
  let enabled = true;

  let sum = 0;

  matches.forEach((match) => {
    if (match.match("mul") && enabled) {
      sum += mul(match);
    } else if (match.match(/do\(\)/)) {
      enabled = true;
    } else if (match.match(/don't\(\)/)) {
      enabled = false;
    }
  });

  console.log(sum);
});
