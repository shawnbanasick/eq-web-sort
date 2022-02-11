import isEqual from "lodash/isEqual";
import checkForColumnOverload from "./checkForColumnOverload";
import useStore from "../../globalState/useStore";

/**
 * Moves an item from one list to another list.
 */
const move = (
  sourceListArray,
  destinationListArray,
  droppableSource,
  droppableDestination,
  columnStatements,
  totalStatements,
  sortCharacteristics,
  allowUnforcedSorts,
  qSortHeaderNumbers
) => {
  const { qSortPattern, qSortHeaders, forcedSorts } = sortCharacteristics;

  const destClone = [...destinationListArray];

  // to splice in and out
  const [removed] = sourceListArray.splice(droppableSource.index, 1);
  destinationListArray.splice(droppableDestination.index, 0, removed);

  sourceListArray[droppableSource.droppableId] = [removed];
  destinationListArray[droppableDestination.droppableId] = [...destClone];

  // to assign to object and register results to state
  const result = {};
  result[droppableSource.droppableId] = [...sourceListArray];
  result[droppableDestination.droppableId] = [...destinationListArray];

  // to save to state and auto update lists
  useStore.setState({ result: result });

  // for sort complete checking
  const columnLengthCheckArray = [];
  for (let i = 0; i < qSortHeaders.length; i++) {
    const currentColumnLength =
      columnStatements.vCols[`column${qSortHeaders[i]}`];
    columnLengthCheckArray.push(currentColumnLength.length);
  }
  // sort mutates, so clone
  const qSortPatternClone = [...qSortPattern];
  const overloadArrayCheck = [...columnLengthCheckArray];
  const match = isEqual(columnLengthCheckArray, qSortPatternClone);

  checkForColumnOverload(
    overloadArrayCheck,
    forcedSorts,
    totalStatements,
    qSortPattern,
    qSortHeaderNumbers
  );

  console.log(sourceListArray.length);

  // to disable checking if unforced Q sorts allowed
  if (allowUnforcedSorts === false) {
    // if the sort pattern matches default sort pattern
    if (match === true) {
      useStore.setState({ hasOverloadedColumn: false });
      useStore.setState({ sortCompleted: true });
      console.log("sorting complete");
      useStore.setState({ isSortingCards: false });
    } else {
      useStore.setState({ sortCompleted: false });
      useStore.setState({ isSortingCards: true });
      useStore.setState({ hasOverloadedColumn: true });
    }
  } else {
    // for unforced sorts - is source array empty?
    if (sourceListArray.length === 0) {
      useStore.setState({ hasOverloadedColumn: false });
      useStore.setState({ sortCompleted: true });
      console.log("sorting complete 2");
      useStore.setState({ isSortingCards: false });
    } else {
      useStore.setState({ sortCompleted: false });
      useStore.setState({ isSortingCards: true });
      useStore.setState({ hasOverloadedColumn: false });
    }
  }
  console.log("moved");
  return null;
};

export default move;
