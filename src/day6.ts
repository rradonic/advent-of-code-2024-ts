import fs from "fs";
import readline from "readline";

type Position = {
  x: number;
  y: number;
};

type Direction = "up" | "down" | "left" | "right";

class Guard {
  position: Position;
  direction: Direction;

  constructor(position: Position) {
    this.position = position;
    this.direction = "up";
  }

  move() {
    const nextPosition = structuredClone(this.position);

    if (this.direction === "up") {
      nextPosition.y--;
    } else if (this.direction === "right") {
      nextPosition.x++;
    } else if (this.direction === "down") {
      nextPosition.y++;
    } else if (this.direction === "left") {
      nextPosition.x--;
    }

    if (grid[nextPosition.y]?.[nextPosition.x] === undefined) {
      return true;
    } else if (grid[nextPosition.y][nextPosition.x].obstacle === false) {
      this.position = nextPosition;
      grid[nextPosition.y][nextPosition.x].visited = true;
    } else if (this.direction === "up") {
      this.direction = "right";
    } else if (this.direction === "right") {
      this.direction = "down";
    } else if (this.direction === "down") {
      this.direction = "left";
    } else if (this.direction === "left") {
      this.direction = "up";
    }

    return false;
  }
}

type Element = {
  obstacle: boolean;
  visited: boolean;
};

const grid: Element[][] = [];
let guard: Guard;

const inputStream = fs.createReadStream("./src/day6.input");
const lineReader = readline.createInterface({ input: inputStream });

lineReader.on("line", (line) => {
  // console.log(line);

  const gridLine = [];

  for (let i = 0; i < line.length; i++) {
    if (line[i] === "^") {
      gridLine.push({ obstacle: false, visited: true });
      guard = new Guard({ y: grid.length, x: i });
    } else {
      gridLine.push({ obstacle: line[i] === "#", visited: false });
    }
  }

  grid.push(gridLine);
});

lineReader.on("close", () => {
  // eslint-disable-next-line no-empty
  while (!guard.move()) {}

  const count = grid.reduce((sum, gridLine) => {
    return (
      sum +
      gridLine.reduce((sum, element) => {
        if (element.visited) {
          return sum + 1;
        } else {
          return sum;
        }
      }, 0)
    );
  }, 0);

  console.log(count);
});
