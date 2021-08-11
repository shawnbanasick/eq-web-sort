import React from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import SortGrid from "./SortGrid";

const Sort = () => {
  const cardFontSize = getGlobalState("cardFontSize");
  setGlobalState("currentPage", "sort");
  setGlobalState("progressScore", 50);

  return <SortGrid cardFontSize={cardFontSize} />;
};

export default view(Sort);
