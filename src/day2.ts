import fs from "fs";
import readline from "readline";

const inputStream = fs.createReadStream("./src/day2.input");
const lineReader = readline.createInterface({ input: inputStream });

function safe(values: number[]) {
  // not safe if we can't determine direction
  if (values[0] === values[1]) {
    return false;
  }

  const direction = values[1] > values[0] ? "up" : "down";

  for (let i = 1; i < values.length; i++) {
    // not safe if values change direction
    if (
      (direction === "up" && values[i] < values[i - 1]) ||
      (direction === "down" && values[i] > values[i - 1])
    ) {
      return false;
    }

    // not safe if values change by less than 1 or more than 3
    const diff = Math.abs(values[i] - values[i - 1]);

    if (diff < 1 || diff > 3) {
      return false;
    }
  }

  return true;
}

let safeCounter = 0;
let dampenedSafeCounter = 0;

lineReader.on("line", (line) => {
  const values = line.split(" ").map((el) => parseInt(el));

  if (safe(values)) {
    safeCounter++;
  }
});

lineReader.on("line", (line) => {
  const values = line.split(" ").map((el) => parseInt(el));

  if (safe(values)) {
    dampenedSafeCounter++;
    return;
  }

  for (let i = 0; i < values.length; i++) {
    if (safe(values.toSpliced(i, 1))) {
      dampenedSafeCounter++;
      return;
    }
  }
});

lineReader.on("close", () => {
  console.log(`Safe counter: ${safeCounter}`);
  console.log(`Dampened safe counter: ${dampenedSafeCounter}`);
});
