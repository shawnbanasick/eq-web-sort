import React from "react";
// import styled from "styled-components";
// import { useStore } from "easy-peasy";
import { view } from "react-easy-state";
import state from "../state";

const ColumnOverloadMessage = props => {
  const columnOverload = state.getState("columnOverload");
  console.log("TCL: columnOverload", columnOverload);
  const overloadedColumn = state.getState("overloadedColumn");

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
