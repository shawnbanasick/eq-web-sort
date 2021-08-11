// card and column styling
const getPostSortCardStyleHigh = (cardHeight, cardWidth) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: `0 2px 0 2px`,
  margin: `5px 5px 5px 5px`,
  lineHeight: `1em`,
  fontSize: 15,
  maxHeight: `${cardHeight}px`,
  maxWidth: `${cardWidth}px`,
  borderRadius: `5px`,
  display: 'flex',
  alignItems: 'center',
  border: `2px solid black`,
  background: `#f6f6f6`,
  textAlign: `center`,
});

export default getPostSortCardStyleHigh;
