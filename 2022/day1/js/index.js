import { readFileSync } from "fs";

const getSortedElfCalorieArray = (file) => {
  return file
    .trim()
    .split("\n\n")
    .map((value) =>
      value
        .split("\n")
        .map((value) => Number(value))
        .reduce((acc, val) => acc + val)
    );
};

const calculateMostCalories = (array) => {
  const result = array.sort((a, b) => b - a)[0];
  console.log(result);
  return result;
};

const calculateTopThree = (array) => {
  const result = array
    .sort((a, b) => b - a)
    .splice(0, 3)
    .reduce((acc, curr) => acc + curr);
  console.log(result);
  return result;
};

const fileContents = readFileSync("../input.txt", "utf-8");

const sortedElfArray = getSortedElfCalorieArray(fileContents);

calculateMostCalories(sortedElfArray);
calculateTopThree(sortedElfArray);
