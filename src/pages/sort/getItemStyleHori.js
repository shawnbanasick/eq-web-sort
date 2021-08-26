import getGlobalState from "../../globalState/getGlobalState";

// card styling
const getItemStyleHori = (
  isDragging,
  draggableStyle,
  sortValue,
  cardColor,
  columnWidth,
  cardHeight,
  cardFontSize
) => {
  const configObj = getGlobalState("configObj");

  let newSortValue = sortValue;
  let newCardColor = cardColor;

  // puts un-evaluated cards at the end of the list and set default color
  if (isNaN(+newSortValue)) {
    newSortValue = 999;
  }

  // set background color according to user passed in values
  if (newCardColor === "undefined" || newCardColor === "yellowSortCard") {
    newCardColor = configObj.yellowCardColor;
  }
  if (newCardColor === "pinkSortCard") {
    newCardColor = configObj.pinkCardColor;
  }
  if (newCardColor === "greenSortCard") {
    newCardColor = configObj.greenCardColor;
  }

  return {
    userSelect: "none",
    WebkitUserSelect: "none",
    lineHeight: `1.3em`,
    fontSize: cardFontSize,
    height: cardHeight,
    minWidth: columnWidth,
    maxWidth: columnWidth,
    paddingRight: 2,
    paddingLeft: 2,
    borderRadius: `5px`,
    marginBottom: 5,
    marginTop: 5,
    marginRight: `2px`,
    marginLeft: `2px`,
    display: "flex",
    alignItems: "center",
    textAlign: `center`,
    order: newSortValue,
    // change background color if dragging, otherwise pre-sort value color
    background: isDragging ? newCardColor : newCardColor,
    // styles to apply on draggables
    ...draggableStyle,
  };
};

export default getItemStyleHori;
