// horizontal column styling
const getListStyleHori = (isDraggingOver, horiCardMinHeight) => ({
  background: isDraggingOver ? 'lightblue' : '#e4e4e4',
  display: 'flex',
  paddingRight: 120,
  width: 950,
  minHeight: horiCardMinHeight,
  overflowX: `scroll`,
  flexDirection: 'row-reverse',
});

export default getListStyleHori;
