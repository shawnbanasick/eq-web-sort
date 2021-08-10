import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
import { view } from "@risingstack/react-easy-state";
import PresortModal from "./PresortModal";
import PresortDND from "./PresortDND";
import getGlobalState from "../../globalState/getGlobalState";
import cloneDeep from "lodash/cloneDeep";
import setDemoData from "../../utilities/setDemoData";

setTimeout(function () {
  setGlobalState("currentPage", "presort");
  setGlobalState("progressScore", 20);
  setDemoData();
}, 100);
// console.log(globalState);

const statements = cloneDeep(window.statementsXML);
// console.log(JSON.stringify(statements));

const PresortPage = () => {
  const cardFontSize = getGlobalState("cardFontSize");
  return (
    <React.Fragment>
      <PresortModal />
      <PresortDND statements={statements} cardFontSize={cardFontSize} />
    </React.Fragment>
  );
};

export default view(PresortPage);
