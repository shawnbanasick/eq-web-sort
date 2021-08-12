import setGlobalState from "../../globalState/setGlobalState";

// card and column styling
const getListStyle = (
  isDraggingOver,
  props,
  forcedSorts,
  columnWidth,
  columnColor
) => {
  let isUnderMaxCards;
  if (forcedSorts === true) {
    isUnderMaxCards = props.columnStatementsArray.length <= props.maxCards;
  } else {
    isUnderMaxCards = true;
  }

  // to set highlighting for column headers
  if (isDraggingOver) {
    setGlobalState("draggingOverColumnId", props.columnId);
  }

  return {
    background: isDraggingOver
      ? "lightblue"
      : isUnderMaxCards
      ? columnColor
      : "orange",
    padding: `3px 5px 0px 5px`,

    minWidth: columnWidth + 13,
    marginTop: 0,
    marginRight: 0,
    minHeight: props.minHeight + 24,
    marginBottom: 220,
    borderRadius: `2px`,
    border: "1px solid #d8d8d8",
  };
};

export default getListStyle;

// border: 'solid 1px #ededed',
