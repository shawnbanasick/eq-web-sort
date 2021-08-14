import React, { useEffect } from "react";
import { view } from "@risingstack/react-easy-state";
import cloneDeep from "lodash/cloneDeep";
import PresortModal from "./PresortModal";
import setGlobalState from "../../globalState/setGlobalState";
import getGlobalState from "../../globalState/getGlobalState";
import PresortDND from "./PresortDND";

const columnStatements = JSON.parse(localStorage.getItem("columnStatements"));
// console.log(JSON.stringify(columnStatements.statementList, null, 2));

const statements = columnStatements.statementList;

// console.log(JSON.stringify(statements));

const PresortPage = () => {
  useEffect(() => {
    setGlobalState("progressScore", 20);
  });

  setGlobalState("currentPage", "presort");
  const cardFontSize = getGlobalState("cardFontSize");
  let cardHeight = getGlobalState("cardHeight");
  if (cardHeight < 145) {
    cardHeight = 145;
    setGlobalState("cardHeight", cardHeight);
  }
  const cardHeightText = `${cardHeight + 10}px 30px 1fr;`;
  return (
    <React.Fragment>
      <PresortModal />
      <PresortDND
        statements={statements}
        cardHeight={cardHeight}
        cardHeightText={cardHeightText}
        cardFontSize={cardFontSize}
      />
    </React.Fragment>
  );
};

export default view(PresortPage);

// 250px 30px auto;
