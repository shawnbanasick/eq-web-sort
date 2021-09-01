import isEqual from "lodash/isEqual";
import setGlobalState from "../../globalState/setGlobalState";
import checkForColumnOverload from "./checkForColumnOverload";

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
  allowUnforcedSorts
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
  setGlobalState("result", result);

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

  checkForColumnOverload(overloadArrayCheck, forcedSorts, totalStatements);

  // to disable checking if unforced Q sorts allowed
  if (allowUnforcedSorts === false) {
    if (match === true) {
      setGlobalState("hasOverloadedColumn", false);
      setGlobalState("sortCompleted", true);
      console.log("sorting complete");
      setGlobalState("isSortingCards", false);
    } else {
      setGlobalState("sortCompleted", false);
      setGlobalState("isSortingCards", true);
      setGlobalState("hasOverloadedColumn", true);
    }
  }
  return null;
};

export default move;
