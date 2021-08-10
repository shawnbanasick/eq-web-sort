// card styling
const getItemStyleHori = (
  isDragging,
  draggableStyle,
  sortValue,
  cardColor,
  columnWidth,
  cardHeight
) => {
  let newSortValue = sortValue;
  let newCardColor = cardColor;
  // puts un-evaluated cards at the end of the list and set default color
  if (isNaN(+newSortValue)) {
    newSortValue = 999;
  }

  if (newCardColor === 'undefined') {
    newCardColor = '#eeeeee';
  }
  return {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    lineHeight: `1em`,
    fontSize: 15,
    height: cardHeight,
    minWidth: columnWidth,
    maxWidth: columnWidth,
    // padding: `15px, 2px, 2px, 0`,
    paddingRight: 2,
    paddingLeft: 2,
    borderRadius: `5px`,
    marginBottom: 5,
    marginTop: 5,
    marginRight: `2px`,
    marginLeft: `2px`,
    display: 'flex',
    alignItems: 'center',
    textAlign: `center`,
    // border: `1px solid lightgray`,
    order: newSortValue,
    // change background color if dragging, otherwise pre-sort value color
    background: isDragging ? '#e6bbad' : newCardColor,
    // styles to apply on draggables
    ...draggableStyle,
  };
};

export default getItemStyleHori;
