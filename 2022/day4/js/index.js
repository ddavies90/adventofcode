import fs from "fs";

const parsedFile = fs.readFileSync("../input.txt", "utf-8").trim().split("\n");

// For each of the pairs, create arrays of all number ranges. Determine the larger of the two arrays by length, check start and end value in smaller array and if they exist in larger array, add one to total number of complete intersections

const createNumberRangeArrays = (inputArray) => {
  const splitRanges = inputArray.map((ranges) => {
    return ranges.split(",");
  });
  const numberRanges = splitRanges.map((range) => {
    const firstStartIndex = Number(range[0].slice(0, range[0].indexOf("-")));
    const firstEndIndex = Number(
      range[0].slice(range[0].indexOf("-") + 1, range[0].length)
    );
    const secondStartIndex = Number(range[1].slice(0, range[1].indexOf("-")));
    const secondEndIndex = Number(
      range[1].slice(range[1].indexOf("-") + 1, range[1].length)
    );

    const firstRangeNumbers = [];
    for (let index = firstStartIndex; index <= firstEndIndex; index++) {
      firstRangeNumbers.push(index);
    }

    const secondRangeNumbers = [];
    for (let index = secondStartIndex; index <= secondEndIndex; index++) {
      secondRangeNumbers.push(index);
    }

    return [firstRangeNumbers, secondRangeNumbers];
  });
  return numberRanges;
};

const calculateTotalIntersections = (numberRangeArrays) => {
  let totalCompleteIntersections = 0;
  let partialIntersections = 0;
  numberRangeArrays.forEach((pairOfArrays) => {
    const range1 = pairOfArrays[0];
    const range2 = pairOfArrays[1];
    const mainRange = range1.length >= range2.length ? range1 : range2;
    const compareRange = mainRange === range1 ? range2 : range1;
    if (
      mainRange.includes(compareRange[0]) &&
      mainRange.includes(compareRange[compareRange.length - 1])
    ) {
      totalCompleteIntersections += 1;
      partialIntersections += 1;
    } else if (
      mainRange.includes(compareRange[0]) ||
      mainRange.includes(compareRange[compareRange.length - 1])
    ) {
      partialIntersections += 1;
    }
  });
  console.log(
    `Total: ${totalCompleteIntersections}\nPartial: ${partialIntersections}`
  );
  return { totalCompleteIntersections, partialIntersections };
};

const numberRanges = createNumberRangeArrays(parsedFile);
calculateTotalIntersections(numberRanges);
