import fs from "fs";
import readline from "readline";

const inputStream = fs.createReadStream("./src/day1.input");
const lineReader = readline.createInterface({ input: inputStream });

const first: number[] = [];
const second: number[] = [];

lineReader.on("line", (line) => {
  const result = line.split("   ");

  first.push(parseInt(result[0]));
  second.push(parseInt(result[1]));
});

lineReader.on("close", () => {
  first.sort();
  second.sort();

  let totalDistance = 0;

  for (let i = 0; i < first.length; i++) {
    totalDistance += Math.abs(first[i] - second[i]);
  }

  console.log(`Total distance: ${totalDistance}`);

  let similarityScore = 0;

  first.forEach((el1) => {
    similarityScore +=
      el1 *
      second.reduce((occurences, el2) => {
        return el1 === el2 ? (occurences += 1) : occurences;
      }, 0);
  });

  console.log(`Similarity score: ${similarityScore}`);
});
