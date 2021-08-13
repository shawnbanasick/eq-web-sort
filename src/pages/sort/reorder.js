import setGlobalState from "../../globalState/setGlobalState";

// to reorder within the same column
const reorder = (
  columnToBeReordered,
  startIndex,
  endIndex,
  columnStatements
) => {
  // no re-ordering of statements list / it's arranged by flexbox "order" css property
  // if (columnToBeReordered === "statements") {
  //   return;
  // }
  // let list = state.getState(columnList);
  const list = columnStatements.vCols[columnToBeReordered];
  console.log("TCL: list", JSON.stringify(list));

  const result = [...list]; // Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log("TCL: result", JSON.stringify(result));

  columnStatements.vCols[columnToBeReordered] = [...result];

  setGlobalState("columnStatements", columnStatements);
  localStorage.setItem("columnStatements", JSON.stringify(columnStatements));

  return null;
};

export default reorder;

/*

  const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });

      */
