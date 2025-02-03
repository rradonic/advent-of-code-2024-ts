import fs from "fs";
import readline from "readline";

type Operator = "+" | "*" | "||";

type Equation = {
  result: number;
  elements: number[];
  operators: Operator[];
};

const equations: Equation[] = [];

function permutations(operators: Operator[], length: number) {
  const result: (typeof operators)[] = [];

  function permute(current: Operator[]) {
    if (current.length === length) {
      result.push(current);
      return;
    }

    for (let i = 0; i < operators.length; i++) {
      permute([...current, operators[i]]);
    }
  }

  permute([]);

  return result;
}

const inputStream = fs.createReadStream("./src/day7.input");
const lineReader = readline.createInterface({ input: inputStream });

lineReader.on("line", (line) => {
  const split = line.split(":");

  equations.push({
    result: parseInt(split[0]),
    elements: split[1]
      .trim()
      .split(" ")
      .map((el) => parseInt(el)),
    operators: [],
  });
});

lineReader.on("close", () => {
  const validResults = equations.map((equation) => {
    const some = permutations(["+", "*", "||"], equation.elements.length - 1).some((combo) => {
      const result = equation.elements.reduce((result, el, i) => {
        if (combo[i - 1] === "+") {
          return result + el;
        } else if (combo[i - 1] === "*") {
          return result * el;
        } else if (combo[i - 1] === "||") {
          return parseInt(result.toString() + el.toString());
        } else {
          throw new TypeError("Unrecognized operator");
        }
      });

      if (result === equation.result) {
        return true;
      }

      return false;
    });

    if (some) {
      return equation.result;
    }

    return undefined;
  });

  console.log(validResults.filter((el) => el !== undefined).reduce((sum, el) => sum + el));
});
