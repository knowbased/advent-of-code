import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const getLengthRange = (range : string[]) =>{
  return parseInt(range[1]) - parseInt(range[0]);
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let result = 0;
  input.split("\n").forEach((pair) =>{
    const ranges = pair.split(",").map((range) =>{
      return range.split("-");
    });

    const lengthRange1 = getLengthRange(ranges[0]);
    const lengthRange2 = getLengthRange(ranges[1]);

    if(lengthRange1 < lengthRange2){
      if(parseInt(ranges[0][0]) >= parseInt(ranges[1][0]) && parseInt(ranges[0][1]) <= parseInt(ranges[1][1])){
        result++;
      }
    }
    else if(parseInt(ranges[1][0]) >= parseInt(ranges[0][0]) && parseInt(ranges[1][1]) <= parseInt(ranges[0][1])){
        result++
    }
  });

  return result;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let result = 0;
  input.split("\n").forEach((pair) =>{
    const ranges = pair.split(",").map((range) =>{
      return range.split("-").map((value) =>{
        return parseInt(value);
      });
    });

    if(ranges[0][0] < ranges[1][0])
    {
      if(ranges[1][0] <= ranges[0][1]){
        result++;
      }
    }else if(ranges[0][0] <= ranges[1][1]){
        result++;
    }
  })

  return result
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
