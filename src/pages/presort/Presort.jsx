import React from "react";
import setGlobalState from "../../globalState/setGlobalState";
import { view } from "@risingstack/react-easy-state";
import PresortModal from "./PresortModal";
import PresortDND from "./PresortDND";
import getGlobalState from "../../globalState/getGlobalState";
import cloneDeep from "lodash/cloneDeep";
import setDemoData from "../../utilities/setDemoData";

setTimeout(function () {
  setGlobalState("progressScore", 20);
  setDemoData();
}, 100);

const statements = cloneDeep(window.statementsXML);

const PresortPage = () => {
  setGlobalState("currentPage", "presort");
  const cardFontSize = getGlobalState("cardFontSize");
  return (
    <React.Fragment>
      <PresortModal />
      <PresortDND statements={statements} cardFontSize={cardFontSize} />
    </React.Fragment>
  );
};

export default view(PresortPage);
