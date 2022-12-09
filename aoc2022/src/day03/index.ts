import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const findCommonLetter2String = (string1 : string, string2 : string) => {
  for(let i = 0; i< string1.length; i++){
    if(string2.includes(string1[i])){
      return string1[i];
    }
  }

  return "";
}

const findCommonLetter3String = (string1 : string, string2 : string, string3 : string) => {
  for(let i = 0; i< string1.length; i++){
    if(string2.includes(string1[i]) && string3.includes(string1[i])){
      return string1[i];
    }
  }

  return "";
}

const getPriority = (char : string) => {
  if(char == char.toLowerCase()){
    return char.charCodeAt(0) - 96;
  }
  else{
    return char.charCodeAt(0) - 65 + 27
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let result = 0;
  input.split("\n").map((rucksack : string) => {

    const halfSize = rucksack.split("").length / 2;
    const firstCompartment : string =  rucksack.slice(0, halfSize);
    const secondCompartment : string = rucksack.slice(halfSize);
    
    const commonLetter = findCommonLetter2String(firstCompartment, secondCompartment);
    result += getPriority(commonLetter);
  });

  return result;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const rucksackArray = input.split("\n");
  
  let result = 0;
  const rucksackGroup = [];
  for(let i = 0; i<rucksackArray.length/3; i++){
    rucksackGroup.push(rucksackArray.slice(3*i, 3*i+3));
  }

  rucksackGroup.forEach((group) =>{
    const commonLetter = findCommonLetter3String(group[0], group[1], group[2]);
    result += getPriority(commonLetter);
  })
  
  return result;
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
