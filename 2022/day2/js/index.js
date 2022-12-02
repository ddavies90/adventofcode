import fs from "fs";

const parsedFile = fs.readFileSync("../input.txt", "utf-8").trim().split("\n");

const scoreMap = {
  AX: 4,
  AY: 8,
  AZ: 3,
  BX: 1,
  BY: 5,
  BZ: 9,
  CX: 7,
  CY: 2,
  CZ: 6,
};

const outcomeMap = {
  choiceOutcome: {
    X: "lose",
    Y: "draw",
    Z: "win",
  },
  A: {
    win: "Y",
    lose: "Z",
    draw: "X",
  },
  B: {
    win: "Z",
    lose: "X",
    draw: "Y",
  },
  C: {
    win: "X",
    lose: "Y",
    draw: "Z",
  },
};

const calculateTotalScore = (parsedInput, scoreLookup) => {
  let total = 0;

  parsedInput.forEach((value) => {
    const matchUp = value.replace(" ", "");
    total += scoreLookup[matchUp];
  });
  console.log(total);
  return total;
};

const determineNewMatchups = (parsedInput, outcomeLookup) => {
  return parsedInput.map((value) => {
    const matchUp = value.replace(" ", "");
    const opponentChoice = matchUp[0];
    const myOutcome = outcomeLookup.choiceOutcome[matchUp[1]];
    const newMatchup = matchUp.replace(
      matchUp[1],
      outcomeLookup[opponentChoice][myOutcome]
    );
    return newMatchup;
  });
};

calculateTotalScore(parsedFile, scoreMap);

const newMatchups = determineNewMatchups(parsedFile, outcomeMap);

calculateTotalScore(newMatchups, scoreMap);
