import React, { useEffect } from "react";
import { view } from "@risingstack/react-easy-state";
// import cloneDeep from "lodash/cloneDeep";
import PresortModal from "./PresortModal";
import setGlobalState from "../../globalState/setGlobalState";
import getGlobalState from "../../globalState/getGlobalState";
import PresortDND from "./PresortDND";

// if (!columnStatements) {
//   const statements = columnStatements.statementList;
// }

// console.log(JSON.stringify(statements));

const PresortPage = () => {
  useEffect(() => {
    // console.log(JSON.stringify(columnStatements.statementList, null, 2));
    setGlobalState("currentPage", "presort");
    setGlobalState("progressScore", 20);
    localStorage.setItem("progressScore", `20`);
  }, []);

  const columnStatements = JSON.parse(localStorage.getItem("columnStatements"));
  const statements = columnStatements.statementList;

  const cardFontSize = getGlobalState("cardFontSize");

  return (
    <React.Fragment>
      <PresortModal />
      <PresortDND statements={statements} cardFontSize={cardFontSize} />
    </React.Fragment>
  );
};

export default view(PresortPage);

// 250px 30px auto;
