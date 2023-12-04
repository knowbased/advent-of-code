import run from "aocrunner"

interface Position {
  x: number;
  y: number;
  steps: number
}

const parseInput = (rawInput: string) => {
  const array : string[][] = [];
  rawInput.split('\n').forEach((line) => {
    array.push(line.split(''));
  })

  return array;
}

const position2String = (position : Position) => {
  return `${position.x},${position.y}`
}
const bfs = (input: string[][], S: Position, E: Position) => {
  const queue: Position[] = [];
  const visited = new Set<String>();

  queue.push(S);
  visited.add(position2String(S));

  while (queue.length > 0) {
    const point = queue.shift() as Position;

    if (point.x === E.x && point.y === E.y) {
      return point.steps;
    }

    const topPoint = { x: point.x - 1, y: point.y, steps: point.steps + 1 };
    if (topPoint.x >= 0 && (input[topPoint.x][topPoint.y].charCodeAt(0) - input[point.x][point.y].charCodeAt(0)) <= 1 && !visited.has(position2String(topPoint))) {
      queue.push(topPoint);
      visited.add(position2String(topPoint));
    }

    const bottomPoint = { x: point.x + 1, y: point.y, steps: point.steps + 1 };
    if (bottomPoint.x < input.length && (input[bottomPoint.x][bottomPoint.y].charCodeAt(0) - input[point.x][point.y].charCodeAt(0)) <= 1 && !visited.has(position2String(bottomPoint))) {
      queue.push(bottomPoint);
      visited.add(position2String(bottomPoint));
    }

    const leftPoint = { x: point.x, y: point.y - 1, steps: point.steps + 1 };
    if (leftPoint.y >= 0 && (input[leftPoint.x][leftPoint.y].charCodeAt(0) - input[point.x][point.y].charCodeAt(0)) <= 1 && !visited.has(position2String(leftPoint))) {
      queue.push(leftPoint);
      visited.add(position2String(leftPoint));
    }

    const rightPoint = { x: point.x, y: point.y + 1, steps: point.steps + 1 };
    if (rightPoint.y < input[0].length &&  (input[rightPoint.x][rightPoint.y].charCodeAt(0) - input[point.x][point.y].charCodeAt(0)) <= 1 && !visited.has(position2String(rightPoint))) {
      queue.push(rightPoint);
      visited.add(position2String(rightPoint));
    }
  }

  return -1;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const E = {
    x: 0,
    y: 0,
    steps : 0
  };

  const S = {
    x: 0,
    y: 0,
    steps : 0
  };

  for(let i=0; i<input.length; i++){
    for(let j=0; j<input[0].length; j++){
      if(input[i][j] === 'E'){
        E.x = i;
        E.y = j;
      }

      if(input[i][j] === 'S'){
        S.x = i;
        S.y = j;
      }
    }
  }

  input[S.x][S.y] = 'a';
  input[E.x][E.y] = 'z';

  return bfs(input, S, E);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const E = {
    x: 0,
    y: 0,
    steps : 0
  };

  const S : Position[] = [];

  for(let i=0; i<input.length; i++){
    for(let j=0; j<input[0].length; j++){
      if(input[i][j] === 'E'){
        E.x = i;
        E.y = j;
        input[E.x][E.y] = 'z';
      }

      if(input[i][j] === 'S' || input[i][j] === 'a'){
        S.push({
          x: i,
          y: j,
          steps: 0,
        })

        input[i][j] = 'a';
      }
    }
  }

  const result : number[] = [];

  S.forEach((start) => {
    const smallPath = bfs(input, start, E);
    if(smallPath !== -1)
    result.push(smallPath);
  })

  result.sort();

  return result[0];
}

run({
  part1: {
    tests: [
      {
        input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
