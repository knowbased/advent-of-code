import run from "aocrunner"

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map((el) => {
    const [intruction, value] = el.split(" ");
    return{
      intruction,
      value: value ? parseInt(value) : undefined
    }
  })
}

const getNewResult = (x: number, cycle: number, result: number) => {
  if((cycle-20)%40 === 0){
    result += x*cycle;
  }

  return result;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let X = 1;
  let cycle = 1;

  let result = 0;

  input.forEach((instructions) =>{
    if(instructions.intruction === 'noop'){
      cycle++;
      result = getNewResult(X, cycle, result);
    }
    else if(instructions.value){
      cycle++;
      result = getNewResult(X, cycle, result);
      cycle++;
      X += instructions.value;
      result = getNewResult(X, cycle, result);

    }  
  })
  return result;
}

const getPixel = (position : number, x : number) => {
  if(position >= x && position <= x+2){
    return '#';
  }

  return '.';
}

const splitString = (str: string, len : number) => {
  const result = [];
  let index = 0;
  while (index < str.length) {
    result.push(str.substring(index, index + len));
    index += len;
  }
  return result;
}


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let X = 0;
  let drawPosition = 0;
  let image : string = '';

  const addPixel = () => {
    image += getPixel(drawPosition, X);
    drawPosition = (drawPosition + 1) % 40;
  };


  input.forEach((instructions) =>{
    if(instructions.intruction === 'noop'){  
      addPixel()
    }
    else if(instructions.value){
      addPixel()
      addPixel()
      X += instructions.value;
    }  

  })

  console.log(splitString(image, 40));

  // letters display in the console.log
  return "RBPARAGF";
}

run({
  part1: {
    tests: [
      {
        input: `addx 15\naddx -11\naddx 6\naddx -3\naddx 5\naddx -1\naddx -8\naddx 13\naddx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `addx 15\naddx -11\naddx 6\naddx -3\naddx 5\naddx -1\naddx -8\naddx 13\naddx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: "",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})


