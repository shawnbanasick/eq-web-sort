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
  const localParticipantName = useStore(getParticipantName);
  const localUsercode = useStore(getLocalUsercode);
  const urlUsercode = localStorage.getItem("urlUsercode") || "";

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
  const [transmissionResults, setTransmissionResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentPage("submit");
    localStorage.setItem("currentPage", "submit");

    const buildResults = async () => {
      let results = {};
      let resultsSurveyFromStorage = JSON.parse(localStorage.getItem("resultsSurvey"));
      if (resultsSurveyFromStorage === undefined) {
        resultsSurveyFromStorage = {};
      }
      const resultsPresort = JSON.parse(localStorage.getItem("resultsPresort")) || {};
      const resultsSortObj = JSON.parse(localStorage.getItem("sortColumns")) || {};

      try {
        results["projectName"] = configObj.studyTitle;
        results["partId"] = localStorage.getItem("partId") || "no part ID";
        results["randomId"] = uuid().substring(0, 12);
        results["urlUsercode"] = localStorage.getItem("urlUsercode") || "no usercode set";
      } catch (error) {
        console.log(error);
        alert("1: " + error.message);
      }

      try {
        results["dateTime"] = dateString;
        results["timeLanding"] = localStorage.getItem("timeOnlandingPage") || "00:00:00";
        results["timePresort"] = localStorage.getItem("timeOnpresortPage") || "00:00:00";
        results["timeSort"] = localStorage.getItem("timeOnsortPage") || "00:00:00";
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
          results["timePostsort"] = localStorage.getItem("timeOnpostsortPage") || "00:00:00";
        }

        if (configObj.showSurvey === true) {
          results["timeSurvey"] = localStorage.getItem("timeOnsurveyPage") || "00:00:00";
        }
      } catch (error) {
        console.log(error);
        alert("3: " + error.message);
      }

      try {
        const presortObject = await createPresortObject();
        Object.assign(results, presortObject);
      } catch (error) {
        console.log(error);
        alert("4: " + error.message);
      }

      try {
        if (configObj.showPostsort) {
          const resultsPostsort = JSON.parse(localStorage.getItem("resultsPostsort")) || {};
          const newPostsortObject = calculatePostsortResults(resultsPostsort, mapObj, configObj);
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

      let resultsSort;
      try {
        if (
          Object.keys(resultsSortObj).length !== 0 &&
          resultsSortObj !== undefined &&
          Object.keys(resultsPresort).length !== 0 &&
          resultsPresort !== undefined
        ) {
          resultsSort = await convertObjectToResults(
            { ...resultsSortObj },
            { ...resultsPresort },
            configObj.traceSorts
          );
        }
      } catch (error) {
        console.log(error);
        alert("7: " + error.message);
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

      setTransmissionResults(results);
      setLoading(false);
    };

    buildResults();
  }, [setCurrentPage, configObj, mapObj, localParticipantName, localUsercode, dateString]);

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
          <SaveLocalDataToLocalStorageButton results={transmissionResults} />
        </ContainerDiv>
      </React.Fragment>
    );
  } else if (configObj.setupTarget === "sheets") {
    return (
      <React.Fragment>
        <SortTitleBar background={headerBarColor}>{pageHeader}</SortTitleBar>
        <ContainerDiv>
          <ContentDiv>{transferTextAbove}</ContentDiv>
          <SubmitButtonGS results={transmissionResults} api={configObj.steinApiUrl} />

          {displaySubmitFallback ? (
            <SubmitFallback results={transmissionResults} />
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
          <SubmitButtonEmail results={transmissionResults} />
        </ContainerDiv>
      </React.Fragment>
    );
  } else if (configObj.setupTarget === "netlify") {
    return (
      <React.Fragment>
        <SortTitleBar background={headerBarColor}>{pageHeader}</SortTitleBar>
        <ContainerDiv>
          <ContentDiv>{transferTextAbove}</ContentDiv>
          <SubmitButtonNetlify results={transmissionResults} />
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
          <SubmitButton results={transmissionResults} />

          {displaySubmitFallback ? (
            <SubmitFallback results={transmissionResults} />
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
*/
