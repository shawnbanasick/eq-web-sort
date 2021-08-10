import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

// to reorder within the same column
const reorder = (
  columnToBeReordered,
  startIndex,
  endIndex,
  columnStatements
) => {
  // no re-ordering of statements list / it's arranged by flexbox "order" css property
  if (columnToBeReordered === "statements") {
    return;
  }
  // let list = state.getState(columnList);
  const list = columnStatements.vCols[columnToBeReordered];
  console.log("TCL: list", JSON.stringify(list));

  const result = [...list]; // Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log("TCL: result", JSON.stringify(result));
  // to save to state and auto update lists

  // state.setState({
  //   [columnList]: result
  // });

  columnStatements.vCols[columnToBeReordered] = [...result];

  // store.dispatch.setColumnStatements(columnStatements);
  setGlobalState("columnStatements", columnStatements);

  return null;
};

export default reorder;
