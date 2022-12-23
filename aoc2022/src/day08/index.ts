import run from "aocrunner"

const WIDTH = 99;

const parseInput = (rawInput: string) => {
  return rawInput.split('').filter((el) => el != '\n').map((el) => parseInt(el));
}


const getIndex = (x : number, y : number) => {
  return x * WIDTH + y % WIDTH
}

const isVisibleLeft = (x : number, y : number, array : number[]) => {
  const indexTree = getIndex(x, y);
  for(let j = 0; j<y; j++){
    if(array[getIndex(x, j)] >= array[indexTree]){
      return false;
    }
  }

  return true;
}

const isVisibleRight = (x : number, y : number, array : number[]) => {
  const indexTree = getIndex(x, y);
  for(let j = y+1; j<WIDTH; j++){
    if(array[getIndex(x, j)] >= array[indexTree]){
      return false;
    }
  }

  return true;
}

const isVisibleTop = (x : number, y : number, array : number[]) => {
  const indexTree = getIndex(x, y);
  for(let i = 0; i<x; i++){
    if(array[getIndex(i, y)] >= array[indexTree]){
      return false;
    }
  }

  return true;
}

const isVisibleBottom = (x : number, y : number, array : number[]) => {
  const indexTree = getIndex(x, y);
  for(let i = x+1; i<WIDTH; i++){
    if(array[getIndex(i, y)] >= array[indexTree]){
      return false;
    }
  };

  return true;
}

const part1 = (rawInput: string) => {
  const treesArray = parseInput(rawInput);

  let result = 0;

  for(let i = 1; i < WIDTH-1; i++){
    for(let j = 1; j < WIDTH-1; j++){
      if(isVisibleTop(i,j, treesArray) || 
      isVisibleBottom(i,j,treesArray) || 
      isVisibleLeft(i,j,treesArray) || 
      isVisibleRight(i,j,treesArray)){
        result++;
      }
    }
  }

  result += 2*WIDTH + 2*(WIDTH-2);
  return result;
}


const getVisibleTreeTop = (x : number, y : number, array : number[]) => {
  const indexTree = getIndex(x, y);
  let numberVisible = 0;

  let i = x;

  do{
    numberVisible++;
    i--;
  }while(array[getIndex(i, y)] < array[indexTree] && i>0)

  return numberVisible;
}

const getVisibleTreeBottom = (x : number, y : number, array : number[]) => {
  const indexTree = getIndex(x, y);
  let numberVisible = 0;

  let i = x;

  do{
    numberVisible++;
    i++;
  }while(array[getIndex(i, y)] < array[indexTree] && i<WIDTH-1)

  return numberVisible;
}

const getVisibleTreeLeft = (x : number, y : number, array : number[]) => {
  const indexTree = getIndex(x, y);
  let numberVisible = 0;

  let j = y;

  do{
    numberVisible++;
    j--;
  }while(array[getIndex(x, j)] < array[indexTree] && j>0)

  return numberVisible;
}

const getVisibleTreeRight = (x : number, y : number, array : number[]) => {
  const indexTree = getIndex(x, y);
  let numberVisible = 0;

  let j = y;

  do{
    numberVisible++;
    j++;
  }while(array[getIndex(x, j)] < array[indexTree] && j<WIDTH-1)

  return numberVisible;
}

const getScenicScore = (x : number, y : number, array : number[]) =>{
  return getVisibleTreeTop(x,y,array) * getVisibleTreeBottom(x,y,array) * getVisibleTreeLeft(x,y,array) * getVisibleTreeRight(x,y,array);
}

const part2 = (rawInput: string) => {
  const treesArray = parseInput(rawInput);
  let maxScenicScore = 0

  for(let i=1; i<WIDTH-1; i++){
    for(let j=1; j<WIDTH-1; j++){
      const scenicScore = getScenicScore(i,j, treesArray);
      if(scenicScore > maxScenicScore)
        maxScenicScore = scenicScore;
    }
  }

  return maxScenicScore
}

run({
  part1: {
    tests: [
    //   {
    //     input: ``,
    //     expected: '',
    //   },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: `30373\n25512\n65332\n33549\n35390`,
      //   expected: 8,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
