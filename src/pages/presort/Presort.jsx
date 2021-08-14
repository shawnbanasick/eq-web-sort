import React, { useEffect } from "react";
import setGlobalState from "../../globalState/setGlobalState";
import { view } from "@risingstack/react-easy-state";
import PresortModal from "./PresortModal";
import PresortDND from "./PresortDND";
import getGlobalState from "../../globalState/getGlobalState";
import cloneDeep from "lodash/cloneDeep";

const statements = cloneDeep(window.statementsXML);

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
