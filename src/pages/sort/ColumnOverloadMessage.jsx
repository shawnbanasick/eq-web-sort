import React from "react";
import { view } from "@risingstack/react-easy-state";

import getGlobalState from "../../globalState/getGlobalState";

const ColumnOverloadMessage = (props) => {
  const columnOverload = getGlobalState("columnOverload");
  console.log("TCL: columnOverload", columnOverload);
  const overloadedColumn = getGlobalState("overloadedColumn");

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
