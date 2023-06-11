import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const array = input.split("\n").reduce<number[]>((acc, currentValue) : number[] =>{
    if(currentValue === ""){
      acc.push(0);
    }else{
      acc[acc.length-1] += parseInt(currentValue);
    }

    return acc;
  }, [0] as number[])

  return Math.max(...array);
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const array = input.split("\n").reduce<number[]>((acc, currentValue) : number[] =>{
    if(currentValue === ""){
      acc.push(0);
    }else{
      acc[acc.length-1] += parseInt(currentValue);
    }

    return acc;
  }, [0] as number[])

  array.sort((a,b)=>b-a);
  return array[0] + array[1] + array[2]
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
