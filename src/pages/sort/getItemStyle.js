const getItemStyle = (
  isDragging,
  draggableStyle,
  cardWidth,
  cardHeight,
  cardFontSize,
  cardColor
) => {
  console.log(cardColor);

  let newCardColor;
  if (cardColor === "greenSortCard") {
    newCardColor = "lightgreen";
  }
  if (cardColor === "yellowSortCard") {
    newCardColor = "lightgray";
  }
  if (cardColor === "pinkSortCard") {
    newCardColor = "rgba(255, 182, 193, 0.4)";
  }

  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: `0 2px 0 2px`,
    margin: `0 2px 8px 3px`,
    lineHeight: `1.3em`,
    fontSize: cardFontSize,
    height: cardHeight,
    width: cardWidth,
    borderRadius: `5px`,
    display: "flex",
    alignItems: "center",
    border: `1px solid #a8a8a8`,
    // justifyContent: `center`,
    // change background colour if dragging
    textAlign: `center`,
    background: isDragging ? "#e6bbad" : newCardColor,

    // styles we need to apply on draggables
    ...draggableStyle,
  };
};

export default getItemStyle;
