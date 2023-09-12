import React, { useEffect } from "react";
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
import PromptUnload from "../../utilities/PromptUnload";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getStatementsObj = (state) => state.statementsObj;
const getCardFontSize = (state) => state.cardFontSize;
const getIsLoggedIn = (state) => state.isLoggedIn;
const getSetCurrentPage = (state) => state.setCurrentPage;
const getSetProgressScore = (state) => state.setProgressScore;
const getPresortNoReturn = (state) => state.presortNoReturn;
const getResults = (state) => state.results;
const getSetResults = (state) => state.setResults;
const getResetColumnStatements = (state) => state.resetColumnStatements;
const getSetDisplayNextButton = (state) => state.setDisplayNextButton;
const getBypassPresort = (state) => state.bypassSort;
const getSetCardFontSize = (state) => state.setCardFontSize;

const PresortPage = (props) => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const statementsObj = useSettingsStore(getStatementsObj);
  let cardFontSize = useStore(getCardFontSize);
  const isLoggedIn = useSettingsStore(getIsLoggedIn);
  const setCurrentPage = useStore(getSetCurrentPage);
  const setProgressScore = useStore(getSetProgressScore);
  const presortNoReturn = useStore(getPresortNoReturn);
  const results = useStore(getResults);
  const setResults = useStore(getSetResults);
  const resetColumnStatements = useSettingsStore(getResetColumnStatements);
  const setDisplayNextButton = useStore(getSetDisplayNextButton);
  const bypassPresort = useStore(getBypassPresort);
  const setCardFontSize = useStore(getSetCardFontSize);

  // set default font size
  if (
    (configObj.setDefaultFontSizePresort === true && bypassPresort === false) ||
    (configObj.setDefaultFontSizePresort === "true" && bypassPresort === false)
  ) {
    cardFontSize = configObj.defaultFontSizePresort;
    setCardFontSize(configObj.defaultFontSizePresort);
  }

  // set next button display
  setDisplayNextButton(true);

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
      const updatedResults = calculateTimeOnPage(
        startTime,
        "presortPage",
        "presortPage",
        results
      );
      setResults(updatedResults);
    };
  }, [results, setResults]);

  let columnStatements = statementsObj.columnStatements;

  if (configObj.setupTarget === "local") {
    columnStatements = JSON.parse(JSON.stringify(resetColumnStatements));
  }

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
  if (presortNoReturn) {
    return <PresortIsComplete />;
  }

  return (
    <React.Fragment>
      <PromptUnload />
      <PresortModal />
      <PresortFinishedModal />
      <PresortPreventNavModal />
      <SortTitleBar background={headerBarColor}>{titleBarText}</SortTitleBar>
      <PresortDND statements={statements} cardFontSize={cardFontSize} />
    </React.Fragment>
  );
};

export default PresortPage;

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
