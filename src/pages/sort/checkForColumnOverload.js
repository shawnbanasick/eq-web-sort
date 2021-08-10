import state from '../state';

const checkForColumnOverload = (
  columnLengthCheckArray,
  forcedSorts,
  totalStatements
) => {
  const sortCharacteristics = state.getState('sortCharacteristics');

  const qSortPattern = [...sortCharacteristics.qSortPattern];

  const { qSortHeaderNumbers } = sortCharacteristics;

  if (forcedSorts === true) {
    const tempArray = [];
    columnLengthCheckArray.forEach(function(item, index) {
      if (item > qSortPattern[index]) {
        tempArray.push(qSortHeaderNumbers[index]);
        state.setState({ setSortCompleted: false });
        state.setState({ setOverloadedColumn: qSortHeaderNumbers[index] });
        state.setState({ setColumnOverload: true });
        state.setState({ setIsSortingCards: false });

        return null;
      }
    });
    if (tempArray.length === 0) {
      state.setState({ setColumnOverload: false });
      state.setState({ setIsSortingCards: true });
    }
  }

  const numSortedStatements = columnLengthCheckArray.reduce(function(acc, val) {
    return acc + val;
  });

  state.setState({ numSortedStatements });

  if (forcedSorts === false) {
    if (numSortedStatements === totalStatements) {
      state.setState({ setSortCompleted: true });
      state.setState({ setIsSortingCards: false });
    } else {
      state.setState({ setSortCompleted: false });
      state.setState({ setIsSortingCards: true });
    }
  }
};

export default checkForColumnOverload;
