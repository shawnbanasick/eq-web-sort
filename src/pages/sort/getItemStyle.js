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
    newCardColor = "#CCFFCC";
  }
  if (cardColor === "yellowSortCard") {
    newCardColor = "#e0e0e0";
  }
  if (cardColor === "pinkSortCard") {
    newCardColor = "#FFCCCC";
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
    transition: `all 1s ease`,
    transitionDelay: "0.2s",
    // justifyContent: `center`,
    // change background colour if dragging  (#e6bbad)
    textAlign: `center`,
    background: isDragging ? "#FFB266" : newCardColor,

    // styles we need to apply on draggables
    ...draggableStyle,
  };
};

export default getItemStyle;
