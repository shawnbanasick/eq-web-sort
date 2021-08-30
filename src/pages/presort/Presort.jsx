import React, { useEffect } from "react";
import { view } from "@risingstack/react-easy-state";
import cloneDeep from "lodash/cloneDeep";
import PresortModal from "./PresortModal";
import setGlobalState from "../../globalState/setGlobalState";
import getGlobalState from "../../globalState/getGlobalState";
import PresortDND from "./PresortDND";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import styled from "styled-components";
import PresortPreventNavModal from "./PresortPreventNavModal";
import PresortIsComplete from "./PresortIsComplete";

const PresortPage = (props) => {
  const columnStatements = props.statements;
  // set progress score and current page
  useEffect(() => {
    setTimeout(() => {
      setGlobalState("currentPage", "presort");
      setGlobalState("progressScore", 20);
    }, 200);
  }, []);

  // calc time on page
  useEffect(() => {
    let startTime = Date.now();
    return () => {
      calculateTimeOnPage(startTime, "presortPage", "presortPage");
    };
  }, []);

  const statements = cloneDeep(columnStatements.statementList);
  const cardFontSize = getGlobalState("cardFontSize");
  const configObj = getGlobalState("configObj");
  const langObj = getGlobalState("langObj");
  const headerBarColor = configObj.headerBarColor;
  const presortNoReturn = getGlobalState("presortNoReturn");

  // early return of finished message if complete
  if (presortNoReturn) {
    return <PresortIsComplete />;
  }

  return (
    <React.Fragment>
      <PresortModal />
      <PresortPreventNavModal />
      <SortTitleBar background={headerBarColor}>
        {langObj.titleBarText}
      </SortTitleBar>
      <PresortDND statements={statements} cardFontSize={cardFontSize} />
    </React.Fragment>
  );
};

export default view(PresortPage);

const SortTitleBar = styled.div`
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 5px;
  min-height: 50px;
  background-color: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
  position: fixed;
  top: 0;
`;
