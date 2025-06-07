import isEqual from "lodash/isEqual";
import checkForColumnOverload from "./checkForColumnOverload";
import useStore from "../../globalState/useStore";

/**
 * Moves an item from one list to another list.
 */
const move = async (
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
  await useStore.setState({ result: result });

  // for sort complete checking
  const columnLengthCheckArray = [];
  for (let i = 0; i < qSortHeaders.length; i++) {
    const currentColumnLength = columnStatements.vCols[`column${qSortHeaders[i]}`];
    columnLengthCheckArray.push(currentColumnLength.length);
  }
  // sort mutates, so clone
  const qSortPatternClone = [...qSortPattern];
  const overloadArrayCheck = [...columnLengthCheckArray];

  // console.log("columnLengthCheckArray", JSON.stringify(columnLengthCheckArray));
  // console.log("qSortPatternClone", JSON.stringify(qSortPatternClone));

  const match = isEqual(columnLengthCheckArray, qSortPatternClone);

  await checkForColumnOverload(
    overloadArrayCheck,
    forcedSorts,
    totalStatements,
    qSortPattern,
    qSortHeaderNumbers
  );

  // to disable checking if unforced Q sorts allowed
  if (allowUnforcedSorts === false) {
    // if the sort pattern matches default sort pattern
    if (match === true) {
      useStore.setState({
        hasOverloadedColumn: false,
        sortCompleted: true,
        isSortingCards: false,
        isSortingFinished: true,
      });
      console.log("sorting complete");
    } else {
      useStore.setState({
        hasOverloadedColumn: true,
        sortCompleted: false,
        isSortingCards: true,
      });
      if (columnStatements.statementList.length === 0) {
        useStore.setState({ isSortingFinished: true });
      } else {
        useStore.setState({ isSortingFinished: false });
      }
    }
  } else {
    // for unforced sorts - is source array empty?
    if (sourceListArray.length === 0) {
      useStore.setState({
        hasOverloadedColumn: false,
        sortCompleted: true,
        isSortingCards: false,
        isSortingFinished: true,
      });
      console.log("sorting complete");
    } else {
      useStore.setState({
        sortCompleted: false,
        isSortingCards: true,
        hasOverloadedColumn: false,
        isSortingFinished: false,
      });
    }
  }
  return null;
};

export default move;
