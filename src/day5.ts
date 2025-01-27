import fs from "fs";
import readline from "readline";

type Rule = {
  before: number;
  after: number;
};

type PendingUpdate = {
  pages: number[];
};

type ValidUpdate = PendingUpdate & {
  correct: true;
  middle: number;
};

type Update = PendingUpdate | ValidUpdate;

type ReadMode = "rules" | "pages";

const rules: Rule[] = [];
const updates: Update[] = [];

let readMode: ReadMode = "rules";

const inputStream = fs.createReadStream("./src/day5.input");
const lineReader = readline.createInterface({ input: inputStream });

lineReader.on("line", (line) => {
  if (readMode === "rules") {
    if (line.length === 0) {
      readMode = "pages";
      return;
    }

    const split = line.split("|");

    rules.push({
      before: parseInt(split[0]),
      after: parseInt(split[1]),
    });
  } else if (readMode === "pages") {
    updates.push({
      pages: line.split(",").map((page) => parseInt(page)),
    });
  }
});

lineReader.on("close", () => {
  const validUpdates = updates
    .filter((update) => {
      const correct = !rules.some((rule) => {
        const indexBefore = update.pages.indexOf(rule.before);
        const indexAfter = update.pages.indexOf(rule.after);

        return indexBefore >= 0 && indexAfter >= 0 && indexBefore > indexAfter;
      });

      return correct;
    })
    .map((update): ValidUpdate => {
      return {
        pages: update.pages,
        correct: true,
        middle: update.pages[Math.floor(update.pages.length / 2)],
      };
    });

  console.log(validUpdates.reduce((middleSum, update) => middleSum + update.middle, 0));
});
