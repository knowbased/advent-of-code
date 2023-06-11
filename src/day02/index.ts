import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let score = 0;
  input.split("\n").forEach((value) => {
    const result = value.split(" ");
    const him = result[0];
    const you = result[1];

    if(you === 'X'){
      score += 1;
    }

    if(you === 'Y'){
      score += 2;
    }

    if(you === 'Z'){
      score += 3;
    }


    if(you === 'X' && him === 'C' ||
      you === 'Y' && him === 'A' ||
      you === 'Z' && him === 'B'){
        score += 6;

    }else if(you === 'X' && him === 'A' ||
    you === 'Y' && him === 'B' ||
    you === 'Z' && him === 'C'){
      score += 3;
    }      

  })

  return score;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const mapWin = new Map();
  mapWin.set('A', 'C');
  mapWin.set('B', 'A');
  mapWin.set('C', 'B');

  const mapLose = new Map();
  mapLose.set('C', 'A');
  mapLose.set('A', 'B');
  mapLose.set('B', 'C');

  const mapScore = new Map();
  mapScore.set('A', 1);
  mapScore.set('B', 2);
  mapScore.set('C', 3);

  let score = 0;

  input.split("\n").forEach((value) => {
    const result = value.split(" ");
    const him = result[0];
    const you = result[1];

    if(you === 'X'){
      score += mapScore.get(mapWin.get(him));
    }

    if(you === 'Y'){
      score += mapScore.get(him);
      score += 3;
    }

    if(you === 'Z'){
      score += mapScore.get(mapLose.get(him));
      score += 6;
    }
  })

  return score;
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
