import run from "aocrunner"

const parseInput = (rawInput: string) => {
  return rawInput.split('\n\n').map((el) => el.split('\n').map((array) => JSON.parse(array)))
}

const compare = (packet1 : any, packet2 :any) : boolean | undefined =>{
  if(typeof(packet1) === 'number' && typeof(packet2) === 'number'){
    if(packet1 === packet2){
      return undefined;
    }
    
    if(packet1 < packet2){
      return true;
    }

    return false;
  }
  
  if(typeof(packet1) === 'number' && Array.isArray(packet2)){
    return compare([packet1], packet2);
  }
  
  if(Array.isArray(packet1) && typeof(packet2) === 'number'){
    return compare(packet1, [packet2]);
  }

  let i = 0;
  while(i < packet1.length || i < packet2.length){
    if(packet1[i] === undefined){
      return true;
    }
    if(packet2[i] === undefined){
      return false;
    }
    const comparaison = compare(packet1[i], packet2[i]);
    if(comparaison !== undefined){
      return comparaison;
    }
    i++;
  }
  return undefined;
}


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let result = 0;

  input.forEach((signal, index) => {
    if(compare(signal[0], signal[1])){
      result += index +1;
    }
  })

  return result;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const allPackets : any[] = [];

  let result = 1;

  input.forEach((el) => {
    allPackets.push(el[0]);
    allPackets.push(el[1]);
  })

  allPackets.push([[2]], [[6]])

  
  allPackets.sort((a, b) => {
    const comparaison = compare(a, b);

    if(comparaison === undefined){
      return 0;
    }

    if(comparaison){
      return -1;
    }

    return 1;
  });

  for(let i=0; i< allPackets.length; i++){
    if(JSON.stringify(allPackets[i]) === JSON.stringify([[2]]) || JSON.stringify(allPackets[i]) === JSON.stringify([[6]])){
      result *= i+1;
    }
  }

  return result;
}

run({
  part1: {
    tests: [
      {
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})


