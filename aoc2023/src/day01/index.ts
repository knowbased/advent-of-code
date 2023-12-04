import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getCalibrationValue = (input: string) => {
  const numbers = input.split("").filter((char) => !isNaN(+char));
  const calibrationValue = Number(
    `${numbers[0]}${numbers[numbers.length - 1]}`,
  );

  return calibrationValue;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  const calibrationValues = lines.map((line) => getCalibrationValue(line));

  const result = calibrationValues.reduce((prevValue, currentValue) => {
    return prevValue + currentValue;
  }, 0);

  return result;
};

const replaceWordByNumber = (input: String) => {
  let newLine = input.replaceAll("one", "o1e");
  newLine = newLine.replaceAll("two", "t2o");
  newLine = newLine.replaceAll("three", "t3hree");
  newLine = newLine.replaceAll("four", "f4our");
  newLine = newLine.replaceAll("five", "f5ive");
  newLine = newLine.replaceAll("six", "s6ix");
  newLine = newLine.replaceAll("seven", "s7even");
  newLine = newLine.replaceAll("eight", "e8ight");
  newLine = newLine.replaceAll("nine", "n9ine");

  return newLine;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  const newLines = lines.map((line) => replaceWordByNumber(line));

  const calibrationValues = newLines.map((line) => getCalibrationValue(line));

  const result = calibrationValues.reduce((prevValue, currentValue) => {
    return prevValue + currentValue;
  }, 0);

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
