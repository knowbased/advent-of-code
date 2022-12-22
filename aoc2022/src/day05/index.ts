import run from "aocrunner"

const parseInput = (rawInput: string) => {
  const containersAndInstruction = rawInput.split("\n\n");
  const containers = containersAndInstruction[0].split("\n");
  containers.pop();
  
  const sortedArray = Array((containers[0].length+1)/4);

  containers.forEach((line) =>{
    for(let i = 0; i<(line.length+1)/4; i++){
      const crate = line.slice(i*4, i*4+3);
      if(crate !== "   "){
        if(sortedArray[i] === undefined){
          sortedArray[i] = [crate];
        }else{
          sortedArray[i].push(crate);
        }
      }
    }
  })

  const instructions = containersAndInstruction[1].split('\n').map((el) => el.split(" "));

  return {
    sortedArray: sortedArray,
    instructions : instructions
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const sortedArray = input.sortedArray;

  input.instructions.forEach(instruction =>{
    const number2Move = parseInt(instruction[1]);
    const from = parseInt(instruction[3]);
    const to = parseInt(instruction[5]);
    
    const result = sortedArray[from-1].splice(0, number2Move);
    sortedArray[to-1] = [...result.reverse(), ...sortedArray[to-1]];
  })
  
  let result = '';
  for(let i=0; i<sortedArray.length; i++){
    result = result + sortedArray[i][0][1];
  }


  return result;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const sortedArray = input.sortedArray;
  
  input.instructions.forEach(instruction =>{
    const number2Move = parseInt(instruction[1]);
    const from = parseInt(instruction[3]);
    const to = parseInt(instruction[5]);
    
    const result = sortedArray[from-1].splice(0, number2Move);
    sortedArray[to-1] = [...result, ...sortedArray[to-1]];
  })
  
  let result = '';
  for(let i=0; i<sortedArray.length; i++){
    result = result + sortedArray[i][0][1];
  }


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
