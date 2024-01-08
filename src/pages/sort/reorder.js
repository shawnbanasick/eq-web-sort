// to reorder within the same column
const reorder = (
  columnToBeReordered,
  startIndex,
  endIndex,
  columnStatements
) => {
  try {
    console.log("reorder");
    // no re-ordering of statements list / it's arranged by flexbox "order" css property
    if (columnToBeReordered === "statements") {
      return columnStatements;
    }
    // let list = state.getState(columnList);
    const list = columnStatements.vCols[columnToBeReordered];
    const result = [...list]; // Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    columnStatements.vCols[columnToBeReordered] = [...result];

    return { ...columnStatements };
  } catch (error) {
    console.error(error);
  }
};

export default reorder;
