import run from "aocrunner"

interface Position {
  x: number;
  y: number;
}

const parseInput = (rawInput: string) => {
  return rawInput.split('\n').map((el) => {
    const [direction, step] = el.split(" ");
    return {
      direction,
      step: parseInt(step),
    }
  })
}

const getSteps = (direction: string) => {
  let stepX = 0;
  let stepY = 0;

  switch (direction) {
    case 'L':
      stepX = -1;
      break;
    case 'U':
      stepY = 1;
      break;
    case 'R':
      stepX = 1;
      break;
    case 'D':
      stepY = -1;
      break;
    default:
      console.error("error steps");
      break;
  }

  return {
    x: stepX,
    y: stepY
  }
}

const updateTailPosition = (tailPosition: Position, headPosition: Position) => {
  
  const sameRow = tailPosition.y === headPosition.y;
  const sameColumn = tailPosition.x === headPosition.x;

  const up1 = tailPosition.y + 1 === headPosition.y; 
  const up2 = tailPosition.y + 2 === headPosition.y; 

  const down1 = tailPosition.y - 1 === headPosition.y;
  const down2 = tailPosition.y - 2 === headPosition.y;

  const left1 = tailPosition.x - 1 === headPosition.x;
  const left2 = tailPosition.x - 2 === headPosition.x;

  const right1 = tailPosition.x + 1 === headPosition.x;
  const right2 = tailPosition.x + 2 === headPosition.x;

  const differenceX = Math.abs(tailPosition.x - headPosition.x);
  const differenceY = Math.abs(tailPosition.y - headPosition.y);

  const maxDifference = Math.max(differenceX, differenceY);

  if (sameColumn && sameRow || maxDifference === 1){
    return;
  }
  
  // 2 right
  if (sameRow && right2) {
    tailPosition.x++;
    return;
  }
  
  // 2 left
  if (sameRow && left2) {
    tailPosition.x--;
    return;
  }
  
  // 1 up
  if (up2 && sameColumn) {
    tailPosition.y++;
    return;
  }
  
  // 1 down
  if (down2 && sameColumn) {
    tailPosition.y--;
    return;
  }
  
  // 2 up 1left
  if ((up2 &&  left1) ||(left2 && up1) || (up2 && left2)) {
    tailPosition.x--;
    tailPosition.y++;
    return;
  }
  
  // 2 up 1 right && 1 up 2 right
  if ((up2 && right1) || (right2 && up1) || (up2 && right2)) {
      tailPosition.x++;
      tailPosition.y++;
      return;
    }

    // 1 down 2 right
    if ((down2 && left1) || (down1 && left2) || (down2 && left2)) {
      tailPosition.x--;
      tailPosition.y--;
      return;
    }

    if ((down2 && right1) || (down1 && right2) || (down2 && right2)) {
      tailPosition.x++;
      tailPosition.y--;
      return;
    }

}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let tailPosition = {
    x: 0,
    y: 0,
  };

  let headPosition = {
    x: 0,
    y: 0,
  };


  let visitedPositions = new Set<string>();
  visitedPositions.add("0,0");

  input.forEach((instruction) => {
    const steps = getSteps(instruction.direction);

    for (let i = 0; i < instruction.step; i++) {
      headPosition.x += steps.x;
      headPosition.y += steps.y;

      updateTailPosition(tailPosition, headPosition)

      const key = `${tailPosition.x},${tailPosition.y}`;
      visitedPositions.add(key);
    }
  })

  return visitedPositions.size
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let visitedPositions = new Set<string>();
  visitedPositions.add("0,0");

  const ropeSize = 10;

  const rope : Position[] = [];

  // init rope
  for(let i=0; i<ropeSize; i++){
    rope.push({
      x: 0,
      y: 0,
    })
  }
  
  input.forEach((instruction) => {
    const steps = getSteps(instruction.direction);
    const headPosition = rope[ropeSize-1];
    
    for (let i = 0; i < instruction.step; i++) {
      headPosition.x += steps.x;
      headPosition.y += steps.y;
      
      
      for(let i = 1; i<ropeSize; i++){
        updateTailPosition(rope[ropeSize-i-1], rope[ropeSize-i])
      }

      const key = `${rope[0].x},${rope[0].y}`;
      visitedPositions.add(key);
    }
  })
  
  return visitedPositions.size;
}

run({
  part1: {
    tests: [
      {
        input: `R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
