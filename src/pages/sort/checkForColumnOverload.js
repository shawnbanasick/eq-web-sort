import useStore from "../../globalState/useStore";

const checkForColumnOverload = (
  columnLengthCheckArray,
  forcedSorts,
  totalStatements,
  qSortPattern,
  qSortHeaderNumbers
) => {
  if (forcedSorts === true) {
    const tempArray = [];

    // iterate through array and check if col length > design length
    columnLengthCheckArray.forEach(function (item, index) {
      if (item > +qSortPattern[index]) {
        tempArray.push(qSortHeaderNumbers[index]);
        useStore.setState({ sortCompleted: false });
        useStore.setState({ overloadedColumn: qSortHeaderNumbers[index] });
        useStore.setState({ hasOverloadedColumn: true });
        useStore.setState({ isSortingCards: false });
        return null;
      }
    });
    // if no overload - set overload to no and is sorting to true
    if (tempArray.length === 0) {
      useStore.setState({ hasOverloadedColumn: false });
      useStore.setState({ isSortingCards: true });
    }
  }

  const numSortedStatements = columnLengthCheckArray.reduce(function (
    acc,
    val
  ) {
    return acc + val;
  });

  useStore.setState({ numSortedStatements: numSortedStatements });

  if (forcedSorts === false) {
    if (numSortedStatements === totalStatements) {
      useStore.setState({ sortCompleted: true });
      useStore.setState({ isSortingCards: false });
    } else {
      useStore.setState({ sortCompleted: false });
      useStore.setState({ isSortingCards: true });
    }
  }
};

export default checkForColumnOverload;
