import React, { useEffect } from "react";
import { view } from "@risingstack/react-easy-state";
import cloneDeep from "lodash/cloneDeep";
import PresortModal from "./PresortModal";
import PresortDND from "./PresortDND";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import styled from "styled-components";
import PresortPreventNavModal from "./PresortPreventNavModal";
import PresortFinishedModal from "./PresortFinishedModal";
import PresortIsComplete from "./PresortIsComplete";
import PleaseLogInFirst from "./PleaseLogInFirst";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const PresortPage = (props) => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const configObj = useSettingsStore((state) => state.configObj);
  const statementsObj = useSettingsStore((state) => state.statementsObj);
  const cardFontSize = useStore((state) => state.cardFontSize);
  const isLoggedIn = useSettingsStore((state) => state.isLoggedIn);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setProgressScore = useStore((state) => state.setProgressScore);
  const presortNoReturn = useStore((state) => state.presortNoReturn);

  useEffect(() => {
    setTimeout(() => {
      setCurrentPage("presort");
      setProgressScore(20);
    }, 200);
  }, [setCurrentPage, setProgressScore]);

  // calc time on page
  useEffect(() => {
    let startTime = Date.now();
    return () => {
      calculateTimeOnPage(startTime, "presortPage", "presortPage");
    };
  }, []);

  const columnStatements = statementsObj.columnStatements;
  const headerBarColor = configObj.headerBarColor;
  const initialScreen = configObj.initialScreen;
  const statements = cloneDeep(columnStatements.statementList);

  const titleBarText = ReactHtmlParser(decodeHTML(langObj.titleBarText));

  // early return if log-in required and not logged in
  if (initialScreen !== "anonymous") {
    if (isLoggedIn === false) {
      return <PleaseLogInFirst />;
    }
  }
  // early return of presort finished message if complete
  console.log(presortNoReturn);
  if (presortNoReturn) {
    return <PresortIsComplete />;
  }

  return (
    <React.Fragment>
      <PresortModal />
      <PresortFinishedModal />
      <PresortPreventNavModal />
      <SortTitleBar background={headerBarColor}>{titleBarText}</SortTitleBar>
      <PresortDND statements={statements} cardFontSize={cardFontSize} />
    </React.Fragment>
  );
};

export default view(PresortPage);

const SortTitleBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  min-height: 50px;
  background-color: ${(props) => props.background};
  color: white;
  font-weight: bold;
  font-size: 28px;
  position: fixed;
  z-index: 999;
  top: 0;
`;
