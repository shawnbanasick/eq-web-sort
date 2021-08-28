import { dropRight } from "lodash";

// horizontal column styling
const getListStyleHori = (isDraggingOver, horiCardMinHeight) => ({
  background: isDraggingOver ? "lightblue" : "#e4e4e4",
  display: "flex",
  width: "100vw",
  paddingRight: "20px",
  minHeight: horiCardMinHeight,
  overflowX: `scroll`,
});

export default getListStyleHori;
