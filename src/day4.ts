import fs from "fs";
import readline from "readline";

const XMAS = "XMAS";

type Origin =
  | "topleft"
  | "top"
  | "topright"
  | "right"
  | "bottomright"
  | "bottom"
  | "bottomleft"
  | "left";

type Element = {
  origins: Origin[];
  letter: string;
};

const grid: Element[][] = [];
let counter = 0;

function checkAndMark(y: number, x: number, origin: Origin) {
  const index = XMAS.indexOf(grid[y][x].letter);

  const sequence: Element[] = [];

  for (let i = 0; i < 4; i++) {
    if (origin === "top") {
      sequence.push(grid[y - index + i]?.[x]);
    } else if (origin === "topright") {
      sequence.push(grid[y - index + i]?.[x + index - i]);
    } else if (origin === "right") {
      sequence.push(grid[y]?.[x + index - i]);
    } else if (origin === "bottomright") {
      sequence.push(grid[y + index - i]?.[x + index - i]);
    } else if (origin === "bottom") {
      sequence.push(grid[y + index - i]?.[x]);
    } else if (origin === "bottomleft") {
      sequence.push(grid[y + index - i]?.[x - index + i]);
    } else if (origin === "left") {
      sequence.push(grid[y]?.[x - index + i]);
    } else if (origin === "topleft") {
      sequence.push(grid[y - index + i]?.[x - index + i]);
    }
  }

  mark(sequence, origin);
}

function mark(sequence: Element[], origin: Origin) {
  if (sequence.reduce((s, el) => s + el?.letter, "") === XMAS) {
    if (!sequence[0].origins.includes(origin)) {
      counter++;
    }

    sequence.forEach((el) => {
      if (!el.origins.includes(origin)) {
        el.origins.push(origin);
      }
    });
  }
}

const inputStream = fs.createReadStream("./src/day4.input");
const lineReader = readline.createInterface({ input: inputStream });

lineReader.on("line", (line) => {
  const gridLine: Element[] = [];

  for (let i = 0; i < line.length; i++) {
    gridLine.push({
      origins: [],
      letter: line[i],
    });
  }

  grid.push(gridLine);
});

lineReader.on("close", () => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      checkAndMark(y, x, "top");
      checkAndMark(y, x, "topright");
      checkAndMark(y, x, "right");
      checkAndMark(y, x, "bottomright");
      checkAndMark(y, x, "bottom");
      checkAndMark(y, x, "bottomleft");
      checkAndMark(y, x, "left");
      checkAndMark(y, x, "topleft");
    }
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x].origins.length > 0) {
        process.stdout.write(grid[y][x].letter);
      } else {
        process.stdout.write(".");
      }
    }

    console.log();
  }

  console.log(counter);
});
