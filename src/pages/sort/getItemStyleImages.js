const getItemStyleImages = (
  isDragging,
  draggableStyle,
  cardWidth,
  cardHeight,
  cardFontSize,
  cardColor,
  greenCardColor,
  yellowCardColor,
  pinkCardColor,
  fontColor
) => {
  let newCardColor;
  if (cardColor === "greenSortCard") {
    newCardColor = greenCardColor;
  }
  if (cardColor === "yellowSortCard") {
    newCardColor = yellowCardColor;
  }
  if (cardColor === "pinkSortCard") {
    newCardColor = pinkCardColor;
  }

  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    lineHeight: `1.3em`,
    fontSize: cardFontSize,
    maxHeight: cardHeight,
    color: fontColor,
    borderRadius: `5px`,
    border: `1px solid #a8a8a8`,
    filter: isDragging ? "brightness(0.85)" : "brightness(1.00)",
    zIndex: "-1",

    // transitionDelay: "0.2s",
    // change background colour if dragging  (#e6bbad or #FFB266)
    textAlign: `center`,
    background: isDragging ? newCardColor : newCardColor,

    // styles we need to apply on draggables
    ...draggableStyle,
  };
};

export default getItemStyleImages;
