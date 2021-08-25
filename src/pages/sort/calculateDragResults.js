import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

const calculateDragResults = (result) => {
  console.log(result);
  const sortGridResults = getGlobalState("sortGridResults");

  // get sortValue from droppableId
  const replaceColumn = /column/gi;
  const replaceN = /N/gi;

  let sortValue1 = result.destination.droppableId;
  sortValue1 = sortValue1.replace(replaceColumn, "");
  sortValue1 = sortValue1.replace(replaceN, "-");
  const sortValue = parseInt(sortValue1, 10);

  sortGridResults[result.draggableId] = sortValue;
  //   sortGridResults[result.draggableId] = result.destination.droppableId;

  setGlobalState("sortGridResults", sortGridResults);
  const testValue = getGlobalState("sortGridResults");

  console.log(JSON.stringify(testValue));
};

export default calculateDragResults;
