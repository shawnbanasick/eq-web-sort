import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import SubmitButton from "./SubmitButton";
import calculatePostsortResults from "./calculatePostsortResults";
import SubmitFallback from "./SubmitFallback";
import { v4 as uuid } from "uuid";
import SaveLocalDataToLocalStorageButton from "./SaveLocalDataToLocalStorageButton";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import LocalSubmitSuccessModal from "./LocalSubmitSuccessModal";
import SubmitButtonGS from "./SubmitButtonGS";
import SubmitButtonEmail from "./SubmitButtonEmail";
import convertObjectToResults from "../sort/convertObjectToResults";
import getCurrentDateTime from "../../utilities/getCurrentDateTime";
import SubmitButtonNetlify from "./SubmitButtonNetlify";
import createPresortObject from "./createPresortObject";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getMapObj = (state) => state.mapObj;
const getSetCurrentPage = (state) => state.setCurrentPage;
const getDisplaySubmitFallback = (state) => state.displaySubmitFallback;
const getDisplayGoodbyeMessage = (state) => state.displayGoodbyeMessage;
const getParticipantName = (state) => state.localParticipantName;
const getLocalUsercode = (state) => state.localUsercode;

const SubmitPage = () => {
  // GLOBAL STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const mapObj = useSettingsStore(getMapObj);
  const setCurrentPage = useStore(getSetCurrentPage);
  const displaySubmitFallback = useStore(getDisplaySubmitFallback);
  const displayGoodbyeMessage = useStore(getDisplayGoodbyeMessage);
  const localParticipantName = useStore(getParticipantName) || "";
  const localUsercode = useStore(getLocalUsercode) || "";

  // Language - grab translations
  const transferTextAbove = ReactHtmlParser(decodeHTML(langObj.transferTextAbove)) || "";
  const transferTextBelow = ReactHtmlParser(decodeHTML(langObj.transferTextBelow)) || "";
  const goodbyeMessage = ReactHtmlParser(decodeHTML(langObj.goodbyeMessage)) || "";
  const linkedProjectFallbackMessage =
    ReactHtmlParser(decodeHTML(langObj.linkedProjectFallbackMessage)) || "";
  const linkedProjectBtnMessage = decodeHTML(langObj.linkedProjectBtnMessage) || "";
  const pageHeader = ReactHtmlParser(decodeHTML(langObj.transferHead)) || "";

  // config options
  const headerBarColor = configObj.headerBarColor;
  const dateString = getCurrentDateTime();

  // State for async results
  // const [finalResults, setfinalResults] = useState({});
  // const [loading, setLoading] = useState(false);
  const loading = false;

  // results object key values
  const projectName = configObj?.studyTitle || "";
  const partId = localStorage.getItem("partId") || "no part ID";
  const randomId = uuid().substring(0, 12);
  const urlUsercode = localStorage.getItem("urlUsercode") || "no usercode set";
  const timeLanding = localStorage.getItem("timeOnlandingPage") || "00:00:00";
  const timePresort = localStorage.getItem("timeOnpresortPage") || "00:00:00";
  const timeSort = localStorage.getItem("timeOnsortPage") || "00:00:00";
  const timePostsort = localStorage.getItem("timeOnpostsortPage") || "00:00:00";
  const timeSurvey = localStorage.getItem("timeOnsurveyPage") || "00:00:00";
  const presortObject = createPresortObject();
  const resultsPresort = JSON.parse(localStorage.getItem("resultsPresort")) || {};
  const resultsSortObj = JSON.parse(localStorage.getItem("sortColumns")) || {};
  const resultsSurveyFromStorage = JSON.parse(localStorage.getItem("resultsSurvey")) || {};
  let resultsPostsort = {};
  let newPostsortObject = {};
  if (configObj.showPostsort) {
    resultsPostsort = JSON.parse(localStorage.getItem("resultsPostsort"));
    newPostsortObject = calculatePostsortResults(resultsPostsort, mapObj, configObj);
  }
  let resultsSort;
  try {
    if (
      Object.keys(resultsSortObj).length !== 0 &&
      resultsSortObj !== undefined &&
      Object.keys(resultsPresort).length !== 0 &&
      resultsPresort !== undefined
    ) {
      resultsSort = convertObjectToResults(
        { ...resultsSortObj },
        { ...resultsPresort },
        configObj.traceSorts
      );
    }
  } catch (error) {
    console.log(error);
    alert("7: " + error.message);
  }

  useEffect(() => {
    setCurrentPage("submit");
    localStorage.setItem("currentPage", "submit");
  }, [setCurrentPage]);

  // *** OLD BUILDER ***
  let results = {};

  try {
    results["projectName"] = projectName;
    results["partId"] = partId;
    results["randomId"] = randomId;
    results["urlUsercode"] = urlUsercode;
  } catch (error) {
    console.log(error);
    alert("1: " + error.message);
  }

  try {
    results["dateTime"] = dateString;
    results["timeLanding"] = timeLanding;
    results["timePresort"] = timePresort;
    results["timeSort"] = timeSort;
  } catch (error) {
    console.log(error);
    alert("2: " + error.message);
  }

  try {
    if (configObj.setupTarget === "local") {
      results["partId"] = localParticipantName || "no part ID";
      results["usercode"] = localUsercode || "no usercode set";
    }

    if (configObj.showPostsort === true) {
      results["timePostsort"] = timePostsort;
    }

    if (configObj.showSurvey === true) {
      results["timeSurvey"] = timeSurvey;
    }
  } catch (error) {
    console.log(error);
    alert("3: " + error.message);
  }

  try {
    Object.assign(results, presortObject);
  } catch (error) {
    console.log(error);
    alert("4: " + error.message);
  }

  try {
    if (configObj.showPostsort) {
      const keys = Object.keys(newPostsortObject);
      for (let i = 0; i < keys.length; i++) {
        let skipText = keys[i].substring(0, 9);
        if (skipText === "textArea-") {
          continue;
        }
        results[keys[i]] = newPostsortObject[keys[i]];
      }
    }
  } catch (error) {
    console.log(error);
    alert("5: " + error.message);
  }

  try {
    if (configObj.showSurvey && resultsSurveyFromStorage !== undefined) {
      Object.assign(results, resultsSurveyFromStorage);
    }
  } catch (error) {
    console.log(error);
    alert("6: " + error.message);
  }

  try {
    Object.assign(results, resultsSort);
  } catch (error) {
    console.log(error);
    alert("8: " + error.message);
  }

  try {
    for (const property in results) {
      if (results[property] === null || results[property] === undefined) {
        results[property] = "no data";
      }
    }
  } catch (error) {
    console.log(error);
    alert("9: " + error.message);
  }

  // early return if data submit success event
  if (displayGoodbyeMessage === true) {
    if (configObj.linkToSecondProject === true) {
      return (
        <GoodbyeDiv>
          {linkedProjectFallbackMessage}
          <a
            id="secondProjectLink"
            href={`${configObj.secondProjectUrl}/#/?usercode=${urlUsercode}`}
            style={{ targetNew: "tab", textDecoration: "none" }}
          >
            <StyledButton>{linkedProjectBtnMessage}</StyledButton>
          </a>
        </GoodbyeDiv>
      );
    } else {
      return (
        <React.Fragment>
          <GoodbyeDiv>{goodbyeMessage}</GoodbyeDiv>
        </React.Fragment>
      );
    }
  }

  if (loading) {
    return (
      <React.Fragment>
        <SortTitleBar background={headerBarColor}>{pageHeader}</SortTitleBar>
        <ContainerDiv>
          <ContentDiv>Loading...</ContentDiv>
        </ContainerDiv>
      </React.Fragment>
    );
  }

  if (configObj.setupTarget === "local") {
    return (
      <React.Fragment>
        <SortTitleBar background={headerBarColor}>{pageHeader}</SortTitleBar>
        <LocalSubmitSuccessModal />
        <ContainerDiv>
          <SaveLocalDataToLocalStorageButton results={results} />
        </ContainerDiv>
      </React.Fragment>
    );
  } else if (configObj.setupTarget === "sheets") {
    return (
      <React.Fragment>
        <SortTitleBar background={headerBarColor}>{pageHeader}</SortTitleBar>
        <ContainerDiv>
          <ContentDiv>{transferTextAbove}</ContentDiv>
          <SubmitButtonGS results={results} api={configObj.steinApiUrl} />

          {displaySubmitFallback ? (
            <SubmitFallback results={results} />
          ) : (
            <ContentDiv>{transferTextBelow}</ContentDiv>
          )}
        </ContainerDiv>
      </React.Fragment>
    );
  } else if (configObj.setupTarget === "email") {
    return (
      <React.Fragment>
        <SortTitleBar background={headerBarColor}>{pageHeader}</SortTitleBar>
        <ContainerDiv>
          <ContentDiv>{transferTextAbove}</ContentDiv>
          <SubmitButtonEmail results={results} />
        </ContainerDiv>
      </React.Fragment>
    );
  } else if (configObj.setupTarget === "netlify") {
    return (
      <React.Fragment>
        <SortTitleBar background={headerBarColor}>{pageHeader}</SortTitleBar>
        <ContainerDiv>
          <ContentDiv>{transferTextAbove}</ContentDiv>
          <SubmitButtonNetlify results={results} />
          <ContentDiv>{transferTextBelow}</ContentDiv>
        </ContainerDiv>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <SortTitleBar background={headerBarColor}>{pageHeader}</SortTitleBar>
        <ContainerDiv>
          <ContentDiv>{transferTextAbove}</ContentDiv>
          <SubmitButton results={results} />

          {displaySubmitFallback ? (
            <SubmitFallback results={results} />
          ) : (
            <ContentDiv>{transferTextBelow}</ContentDiv>
          )}
        </ContainerDiv>
      </React.Fragment>
    );
  }
};

export default SubmitPage;

const SortTitleBar = styled.div`
  width: calc(100vw-4px);
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 5px;
  min-height: 50px;
  background-color: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
`;

const ContainerDiv = styled.div`
  display: flex;
  min-height: 600px;
  width: calc(100vw-4px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2em;
  width: 85vw;
  font-size: 1.35em;
  padding: 25px;
  align-self: center;
`;

const GoodbyeDiv = styled.div`
  display: flex;
  width: calc(100vw -20px);
  height: calc(100vh - 50px);
  font-size: 22px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: auto;
  height: 75px;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: ${({ theme, active }) => (active ? theme.secondary : theme.primary)};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.focus};
  }
  a {
    text-decoration: none;
  }
`;

/*
--- Example results object ---

{
  "projectName": "my Q study",
  "partId": "anonymous",
  "randomId": "367eee86-f28",
  "usercode": "no usercode set",
  "dateTime": "no data",
  "timeLanding": "no data",
  "timePresort": "no data",
  "timeSort": "no data",
  "timePostsort": "no data",
  "timeSurvey": "no data",
  "npos": 0,
  "nneu": 0,
  "nneg": 0,
  "column4_1": "no response",
  "column4_2": "no response",
  "columnN4_1": "no response",
  "columnN4_2": "no response",
  "sort": "no data"
}
SubmitButton.jsx:60 

*** Functional Solution ***
   useEffect(
     () => {
   const resultsObj = () => ({
     projectName: "",
     partId: "",
     randomId: "",
     urlUsercode: "",
     usercode: "",
     dateTime: "",
     timeLanding: "",
     timePresort: "",
     timeSort: "",
     timePostsort: "",
     timeSurvey: "",
     npos: 0,
     posStateNums: "",
     nneu: 0,
     neuStateNums: "",
     sort: "",
     presortTrace: "",
   });

    *** NEW BUILDER ***
   const withProjectName = (resultsObj, projectName) => ({ ...resultsObj, projectName });
   const withPartId = (resultsObj, partId) => ({ ...resultsObj, partId });
   const withRandomId = (resultsObj, randomId) => ({ ...resultsObj, randomId });
   const withUrlUsercode = (resultsObj, randomId) => ({ ...resultsObj, randomId });

   const compose =
     (...fns) =>
     (x) =>
       fns.reduce((acc, fn) => fn(acc), x);

   const newBuildResults = compose(
     (resultsObj) => withProjectName(resultsObj, projectName),
     (resultsObj) => withPartId(resultsObj, partId),
     (resultsObj) => withRandomId(resultsObj, randomId),
     (resultsObj) => withUrlUsercode(resultsObj, urlUsercode)
   );

   const results = newBuildResults(resultsObj());

   console.log(JSON.stringify(results, null, 2));



*/
