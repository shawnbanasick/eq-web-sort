// horizontal column styling
const getListStyleHori = (isDraggingOver, horiCardMinHeight) => ({
  background: isDraggingOver ? "lightblue" : "#e4e4e4",
  display: "flex",
  paddingRight: 20,
  width: "100vw",
  minHeight: horiCardMinHeight,
  overflowX: `scroll`,
  // flexDirection: "row-reverse",
});

export default getListStyleHori;
