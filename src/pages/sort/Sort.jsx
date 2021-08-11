import React, { useState } from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import SortGrid from "./SortGrid";

const Sort = () => {
  const cardFontSize = getGlobalState("cardFontSize");
  console.log("in Sort", cardFontSize);

  return <SortGrid cardFontSize={cardFontSize} />;
};

export default view(Sort);
