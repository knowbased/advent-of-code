import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getMaxForEachColor = (game: string) => {
  const couplesColorNumber = game.split(/[;,]/);

  const couples = couplesColorNumber.map((couple) => {
    couple = couple.trim();
    const [number, color] = couple.split(" ");
    return { color: color, number: parseInt(number) };
  });

  const max = {
    red: 0,
    green: 0,
    blue: 0,
  };

  couples.forEach((couple) => {
    if (couple.color === "red" && couple.number > max.red) {
      max.red = couple.number;
    }
    if (couple.color === "green" && couple.number > max.green) {
      max.green = couple.number;
    }
    if (couple.color === "blue" && couple.number > max.blue) {
      max.blue = couple.number;
    }
  });
  return max;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  const games = lines.map((line) => line.split(":")[1].trim());

  const maxForEachColor = games.map((game) => getMaxForEachColor(game));

  const result = maxForEachColor.reduce((acc, max, index) => {
    if (max.red > 12 || max.green > 13 || max.blue > 14) {
      return acc;
    }

    return acc + index + 1;
  }, 0);

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  const games = lines.map((line) => line.split(":")[1].trim());

  const maxForEachColor = games.map((game) => getMaxForEachColor(game));

  const result = maxForEachColor.reduce((acc, max) => {
    return acc + max.red * max.green * max.blue;
  }, 0);

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
