import React, { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
// import PresortModal from "./PresortModal";
// import PresortDND from "./PresortDND";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import styled from "styled-components";
// import PresortPreventNavModal from "./PresortPreventNavModal";
import MobilePresortFinishedModal from "./MobilePresortFinishedModal";
import PresortIsComplete from "./PresortIsComplete";
import PleaseLogInFirst from "./PleaseLogInFirst";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
// import PromptUnload from "../../utilities/PromptUnload";
// import PresortDndImages from "./PresortDndImages";
import MobileStatementBox from "./MobileStatementBox";
import MobileValueButton from "./MobileValueButton";
import MobilePreviousAssignmentBox from "./MobilePreviousAssignmentBox";
import useScreenOrientation from "../../utilities/useScreenOrientation";
import mobileCardColor from "./mobileCardColor";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getStatementsObj = (state) => state.statementsObj;
// const getCardFontSizePresort = (state) => state.cardFontSizePresort;
const getIsLoggedIn = (state) => state.isLoggedIn;
const getSetCurrentPage = (state) => state.setCurrentPage;
const getSetProgressScore = (state) => state.setProgressScore;
const getPresortNoReturn = (state) => state.presortNoReturn;
const getResetColumnStatements = (state) => state.resetColumnStatements;
const getSetDisplayNextButton = (state) => state.setDisplayNextButton;
const getSetMobilePresortResults = (state) => state.setMobilePresortResults;
const getMobilePresortResults = (state) => state.mobilePresortResults;
const getSetTriggerMobilePresortFinishedModal = (state) =>
  state.setTriggerMobilePresortFinishedModal;

const PresortPage = (props) => {
  // GLOBAL STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const statementsObj = useSettingsStore(getStatementsObj);
  // let cardFontSize = useStore(getCardFontSizePresort);
  const isLoggedIn = useSettingsStore(getIsLoggedIn);
  const setCurrentPage = useStore(getSetCurrentPage);
  const setProgressScore = useStore(getSetProgressScore);
  const presortNoReturn = useStore(getPresortNoReturn);
  const resetColumnStatements = useSettingsStore(getResetColumnStatements);
  const setDisplayNextButton = useStore(getSetDisplayNextButton);
  const cardFontSizePersist = +localStorage.getItem("fontSizePresort");
  const setMobilePresortResults = useStore(getSetMobilePresortResults);
  const mobilePresortResults = useStore(getMobilePresortResults);
  const setTriggerPresortFinishedModal = useStore(
    getSetTriggerMobilePresortFinishedModal
  );

  let screenOrientation = useScreenOrientation();

  if (cardFontSizePersist) {
    // cardFontSize = cardFontSizePersist;
  }

  const [stateNum, setStateNum] = useState(0);
  let statementText =
    statementsObj.columnStatements.statementList[stateNum].statement;

  useEffect(() => {
    if (stateNum === statementsObj.totalStatements - 1) {
      setTriggerPresortFinishedModal(true);
      console.log("Presort Finished");
    }
  }, [stateNum, statementsObj.totalStatements, setTriggerPresortFinishedModal]);

  //   console.log(JSON.stringify(statementsObj));

  // set next button display
  setDisplayNextButton(true);

  useEffect(() => {
    let startTime = Date.now();
    const setStateAsync = async () => {
      await setCurrentPage("presort");
      localStorage.setItem("currentPage", "presort");
      await setProgressScore(20);
    };
    setStateAsync();
    return () => {
      calculateTimeOnPage(startTime, "presortPage", "presortPage");
    };
  }, [setCurrentPage, setProgressScore]);

  let columnStatements = statementsObj.columnStatements;

  if (configObj.setupTarget === "local") {
    columnStatements = JSON.parse(JSON.stringify(resetColumnStatements));
  }

  const headerBarColor = configObj.headerBarColor;
  const initialScreen = configObj.initialScreen;
  const statements = cloneDeep(columnStatements.statementList);
  const imageSort = configObj.useImages;

  const titleText =
    ReactHtmlParser(decodeHTML(langObj.mobilePresortConditionsOfInstruction)) ||
    "";

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

  const handleClick = (event) => {
    // console.log(parseInt(event.target.innerText, 10));
    let tempObj = {};
    tempObj.statement = statementText;
    tempObj.value = parseInt(event.target.innerText, 10);
    tempObj.id = statementsObj.columnStatements.statementList[stateNum].id;
    tempObj.color = mobileCardColor(tempObj.value);
    if (localStorage.getItem("mobilePresortResults")) {
      //   let tempArray = JSON.parse(localStorage.getItem("mobilePresortResults"));
      mobilePresortResults.push(tempObj);
      setMobilePresortResults(mobilePresortResults);
      localStorage.setItem(
        "mobilePresortResults",
        JSON.stringify(mobilePresortResults)
      );
    } else {
      mobilePresortResults.push(tempObj);
      setMobilePresortResults(mobilePresortResults);
      localStorage.setItem(
        "mobilePresortResults",
        JSON.stringify(mobilePresortResults)
      );
    }
    if (stateNum === statementsObj.totalStatements - 1) {
      // setTriggerPresortFinishedModal(true);
    } else {
      setStateNum(stateNum + 1);
    }
  };

  console.log(screenOrientation);
  if (screenOrientation === "landscape-primary") {
    return (
      <OrientationDiv>
        <h1>Please use Portrait orientation!</h1>
      </OrientationDiv>
    );
  }

  return (
    <Container>
      <SortTitleBar>{titleText}</SortTitleBar>
      <MobileStatementBox statement={statementText} />
      <RowText>Similar to my thinking</RowText>
      <ButtonRow>
        <MobileValueButton
          value={4}
          text={`+4`}
          color={`#31C48D`}
          onClick={handleClick}
        />
        <MobileValueButton
          value={3}
          text={`+3`}
          color={`#84E1BC`}
          onClick={handleClick}
        />
        <MobileValueButton
          value={2}
          text={`+2`}
          color={`#BCF0DA`}
          onClick={handleClick}
        />
      </ButtonRow>
      <RowText>No strong feelings</RowText>
      <ButtonRow>
        <MobileValueButton
          value={1}
          text={`+1`}
          color={`#DEF7EC`}
          onClick={handleClick}
        />
        <MobileValueButton
          value={0}
          text={`0`}
          color={`#F3F4F6`}
          onClick={handleClick}
        />
        <MobileValueButton
          value={-1}
          text={`-1`}
          color={`#FDE8E8`}
          onClick={handleClick}
        />
      </ButtonRow>
      <RowText>Different from my thinking</RowText>
      <ButtonRow>
        <MobileValueButton
          value={-2}
          text={`-2`}
          color={`#FBD5D5`}
          onClick={handleClick}
        />
        <MobileValueButton
          value={-3}
          text={`-3`}
          color={`#F8B4B4`}
          onClick={handleClick}
        />
        <MobileValueButton
          value={-4}
          text={`-4`}
          color={`#F98080`}
          onClick={handleClick}
        />
      </ButtonRow>
      <RowText>Completed Assignments</RowText>

      <MobilePreviousAssignmentBox statement={statementText} />
      <ModalContainer>
        <MobilePresortFinishedModal />
      </ModalContainer>

      {/* <PromptUnload />
      <PresortModal />
      <PresortPreventNavModal />
      {imageSort ? (
        <PresortDndImages cardFontSize={cardFontSize} />
      ) : (
        <PresortDND statements={statements} cardFontSize={cardFontSize} />
      )} */}
    </Container>
  );
};

export default PresortPage;

const SortTitleBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  min-height: 30px;
  height: 10vh;
  color: black;
  font-weight: bold;
  font-size: 2vh;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 9vh 20vh 3vh 5vh 3vh 5vh 3vh 5vh 6vh 1fr;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  user-select: none;
  background-color: #f3f4f6;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85vw;
  padding-left: 1.5vw;
  justify-self: center;
`;

const RowText = styled.div`
  display: flex;
  justify-content: left;
  align-items: flex-end;
  font-size: 2.5vh;
  padding-left: 2.5vw;
`;

const OrientationDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 100vh;
  padding-right: 10vh;
`;
