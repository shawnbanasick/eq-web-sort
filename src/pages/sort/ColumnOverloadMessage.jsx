import React from "react";
import { view } from "@risingstack/react-easy-state";
import useStore from "../../globalState/useStore";

const ColumnOverloadMessage = (props) => {
  const columnOverload = useStore((state) => state.columnOverload);
  const overloadedColumn = useStore((state) => state.overloadedColumn);

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

export default view(ColumnOverloadMessage);
