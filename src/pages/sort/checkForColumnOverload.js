import setGlobalState from "../../globalState/setGlobalState";
import getGlobalState from "../../globalState/getGlobalState";

const checkForColumnOverload = (
  columnLengthCheckArray,
  forcedSorts,
  totalStatements
) => {
  console.log("check for overload");
  console.log(forcedSorts);
  const configObj = getGlobalState("configObj");
  const qSortPattern = [...configObj.qSortPattern];
  console.log(qSortPattern);
  const qSortHeaderNumbers = [...configObj.qSortHeaderNumbers];
  console.log(qSortHeaderNumbers);

  if (forcedSorts === true) {
    console.log("forced");

    const tempArray = [];
    columnLengthCheckArray.forEach(function (item, index) {
      if (item > +qSortPattern[index]) {
        console.log("over");
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
