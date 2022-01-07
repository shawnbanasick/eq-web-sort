import React from "react";
import useStore from "../../globalState/useStore";

const getColumnOverload = (state) => state.columnOverload;
const getOverloadedColumn = (state) => state.overloadedColumn;

const ColumnOverloadMessage = (props) => {
  const columnOverload = useStore(getColumnOverload);
  const overloadedColumn = useStore(getOverloadedColumn);

  console.log("TCL: columnOverload", columnOverload);

  if (columnOverload) {
    return (
      <div>
        <p>Column {overloadedColumn} has too many cards.</p>
      </div>
    );
  }
  return null;
};

export default ColumnOverloadMessage;
