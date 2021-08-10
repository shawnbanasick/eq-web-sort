const getItemStyle = (isDragging, draggableStyle, cardWidth, cardHeight) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: `0 2px 0 2px`,
  margin: `0 2px 8px 3px`,
  lineHeight: `1em`,
  fontSize: 15,
  height: cardHeight,
  width: cardWidth,
  borderRadius: `5px`,
  display: 'flex',
  alignItems: 'center',
  border: `1px solid #a8a8a8`,
  // justifyContent: `center`,
  // change background colour if dragging
  textAlign: `center`,
  background: isDragging ? '#e6bbad' : '#eeeeee',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default getItemStyle;
