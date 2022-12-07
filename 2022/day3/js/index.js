import fs from "fs";

const rucksacks = fs.readFileSync("../input.txt", "utf-8").split("\n");

const findCompartmentCommonItems = (rucksacks) => {
  const rucksacksCompartmentalised = rucksacks.map((rucksack) => {
    return [
      rucksack.slice(0, rucksack.length / 2).split(""),
      rucksack.slice(rucksack.length / 2, rucksack.length).split(""),
    ];
  });
  const commonItems = rucksacksCompartmentalised.map((rucksack) => {
    const matches = rucksack[0].filter((item) => {
      return rucksack[1].includes(item);
    });
    return new Set(matches);
  });
  return commonItems;
};

const findElfGroupCommonItems = (rucksacks) => {
  let groupArray = [];
  let tempGroupArray = [];
  for (let index = 0; index < rucksacks.length; index++) {
    tempGroupArray.push(rucksacks[index].split(""));
    if (tempGroupArray.length === 3) {
      groupArray.push(tempGroupArray);
      tempGroupArray = [];
    }
  }
  const elfGroupSharedItems = groupArray.map((group) => {
    return new Set(
      group[0].filter(
        (item) => group[1].includes(item) && group[2].includes(item)
      )
    );
  });
  return elfGroupSharedItems;
};

const sumCommonItems = (arrayOfSets) => {
  let total = 0;
  arrayOfSets.forEach((set) => {
    set.forEach((element) => {
      if (element === undefined) {
        return;
      }
      const charCode = element.charCodeAt(0);
      if (charCode > 96) {
        total = total + (charCode - 96);
      } else {
        total = total + (charCode - 38);
      }
    });
  });
  console.log(total);
  return total;
};

const commonItems = findCompartmentCommonItems(rucksacks);

sumCommonItems(commonItems);

const elfGroupCommonItems = findElfGroupCommonItems(rucksacks);

sumCommonItems(elfGroupCommonItems);
