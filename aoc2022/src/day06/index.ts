import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const containsDuplicateLetters = (string : string) => {
    // Convertir la chaîne en tableau de caractères
    const chars = string.split('');
  
    // Vérifier s'il y a des doublons dans le tableau
    return new Set(chars).size !== chars.length;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let i = 0;
  let slice;

  do{
    slice = input.slice(i, i+4);
    i++;
  }while(containsDuplicateLetters(slice));

  return i+3;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let i = 0;
  let slice;

  do{
    slice = input.slice(i, i+14);
    i++;
  }while(containsDuplicateLetters(slice));

  return i+13;
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
