import setGlobalState from "../../globalState/setGlobalState";

const checkForColumnOverload = (
  columnLengthCheckArray,
  forcedSorts,
  totalStatements,
  qSortPattern,
  qSortHeaderNumbers
) => {
  if (forcedSorts === true) {
    const tempArray = [];
    columnLengthCheckArray.forEach(function (item, index) {
      if (item > +qSortPattern[index]) {
        tempArray.push(qSortHeaderNumbers[index]);
        setGlobalState("setSortCompleted", false);
        setGlobalState("setOverloadedColumn", qSortHeaderNumbers[index]);
        setGlobalState("setColumnOverload", true);
        setGlobalState("setIsSortingCards", false);

        return null;
      }
    });
    if (tempArray.length === 0) {
      setGlobalState("setColumnOverload", false);
      setGlobalState("setIsSortingCards", true);
    }
  }

  const numSortedStatements = columnLengthCheckArray.reduce(function (
    acc,
    val
  ) {
    return acc + val;
  });

  setGlobalState("numSortedStatements", numSortedStatements);

  if (forcedSorts === false) {
    if (numSortedStatements === totalStatements) {
      setGlobalState("setSortCompleted", true);
      setGlobalState("setIsSortingCards", false);
    } else {
      setGlobalState("setSortCompleted", false);
      setGlobalState("setIsSortingCards", true);
    }
  }
};

export default checkForColumnOverload;
