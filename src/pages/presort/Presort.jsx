import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
import { view } from "@risingstack/react-easy-state";
import PresortModal from "./PresortModal";
import PresortDND from "./PresortDND";
import getGlobalState from "../../globalState/getGlobalState";
import cloneDeep from "lodash/cloneDeep";

setTimeout(function () {
  setGlobalState("currentPage", "presort");
}, 100);
console.log(globalState);

const statements = cloneDeep(window.statementsXML);
console.log(JSON.stringify(statements));

const PresortPage = () => {
  return (
    <React.Fragment>
      <h1>Presort Page!</h1>
      <PresortModal />
      <PresortDND statements={statements} />
    </React.Fragment>
  );
};

export default view(PresortPage);
