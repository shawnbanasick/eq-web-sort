import useStore from "../../globalState/useStore";

const checkForColumnOverload = async (
  columnLengthCheckArray,
  forcedSorts,
  totalStatements,
  qSortPattern,
  qSortHeaderNumbers
) => {
  if (forcedSorts === true) {
    const tempArray = [];

    // iterate through array and check if col length > design length
    await columnLengthCheckArray.forEach(function (item, index) {
      if (item > +qSortPattern[index]) {
        tempArray.push(qSortHeaderNumbers[index]);
        useStore.setState({
          sortCompleted: false,
          overloadedColumn: qSortHeaderNumbers[index],
          hasOverloadedColumn: true,
          isSortingCards: false,
        });
        return null;
      }
    });
    // if no overload - set overload to no and is sorting to true
    if (tempArray.length === 0) {
      useStore.setState({
        hasOverloadedColumn: false,
        isSortingCards: true,
      });
    }
  }

  const numSortedStatements = columnLengthCheckArray.reduce(function (acc, val) {
    return acc + val;
  });

  await useStore.setState({ numSortedStatements: numSortedStatements });

  if (forcedSorts === false) {
    if (numSortedStatements === totalStatements) {
      useStore.setState({
        sortCompleted: true,
        isSortingCards: false,
      });
    } else {
      useStore.setState({
        sortCompleted: false,
        isSortingCards: true,
      });
    }
  }
};

export default checkForColumnOverload;
