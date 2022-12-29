import run from "aocrunner"

const parseInput = (rawInput: string) => {
  return rawInput.split('\n\n').map((monkey) => {
    const [id, itemsString, operationString, testString, testTrueString, testFalseString] = monkey.split("\n");

    const items = itemsString.split(':')[1].split(',').map((el) => parseInt(el));
    const operation = operationString.split(' = ')[1].split(" ");
    const test = parseInt(testString.split(' ')[5]);
    const testTrue = parseInt(testTrueString.split(' ')[9]);
    const testFalse = parseInt(testFalseString.split(' ')[9]);

    return {
      items,
      operation,
      test : {
        divisible : test,
        true : testTrue,
        false : testFalse
      }
    }
  })
}

const getNewWorryLevel = (currentLevel: number, operation: string[]): number => {
  const number1 = operation[0] === 'old' ? currentLevel : parseInt(operation[0]);
  const number2 = operation[2] === 'old' ? currentLevel : parseInt(operation[2]);
  const operator = operation[1];

  if(operator === '+')
    return number1 + number2;

  if(operator === '*')
    return number1 * number2;

  return 0;
}

const part1 = (rawInput: string) => {
  const input= parseInput(rawInput)

  const updateMonkeys = () => {
    input.forEach((monkey, index) => {
      for(let i = 0; i<monkey.items.length; i++){
        monkey.items[i] = getNewWorryLevel(monkey.items[i], monkey.operation);
        monkey.items[i] = Math.floor(monkey.items[i] / 3);
  
        if(monkey.items[i] % monkey.test.divisible === 0)
          input[monkey.test.true].items.push(monkey.items[i]);
        else
          input[monkey.test.false].items.push(monkey.items[i]);

        nbInspectItems[index]++;
      }
      
      monkey.items = [];
    })
  };

  const nbInspectItems = Array(input.length).fill(0);

  const nbRound = 20;

  for(let i=0; i<nbRound; i++){
    updateMonkeys();
  }

  nbInspectItems.sort((a, b) => b - a);
  return nbInspectItems[0] * nbInspectItems[1]
}

const part2 = (rawInput: string) => {
  const input= parseInput(rawInput)

  const modLCM = input.reduce((a, b) => a * b.test.divisible, 1);

  const updateMonkeys = () => {
    input.forEach((monkey, index) => {
      for(let i = 0; i<monkey.items.length; i++){
        monkey.items[i] = getNewWorryLevel(monkey.items[i], monkey.operation);
        monkey.items[i] = monkey.items[i] % modLCM;
  
        if(monkey.items[i] % monkey.test.divisible === 0)
          input[monkey.test.true].items.push(monkey.items[i]);
        else
          input[monkey.test.false].items.push(monkey.items[i]);

        nbInspectItems[index]++;
      }
      
      monkey.items = [];
    })
  };

  const nbInspectItems = Array(input.length).fill(0);

  const nbRound = 10000;

  for(let i=0; i<nbRound; i++){
    updateMonkeys();
  }

  nbInspectItems.sort((a, b) => b - a);
  return nbInspectItems[0] * nbInspectItems[1]
}

run({
  part1: {
    tests: [
      {
        input: `Monkey 0:
Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Monkey 0:
Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})



