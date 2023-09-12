import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import LandingModal from "../landing/LandingModal";
import LogInScreen from "./LogInScreen";
import PartIdScreen from "./PartIdScreen";
import AccessCodeScreen from "./AccessCodeScreen";
import checkForIeBrowser from "./checkForIeBrowser";
import InternetExplorerWarning from "./InternetExplorerWarning";
import parseParams from "./parseParams";
import LocalStart from "./LocalStart";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getDataLoaded = (state) => state.dataLoaded;
const getSetCurrentPage = (state) => state.setCurrentPage;
const getSetProgressScore = (state) => state.setProgressScore;
const getSetUrlUsercode = (state) => state.setUrlUsercode;
const getResults = (state) => state.results;
const getSetResults = (state) => state.setResults;
const getDisplayLandingContent = (state) => state.displayLandingContent;
const getSetDisplayNextButton = (state) => state.setDisplayNextButton;
const getSetCardFontSize = (state) => state.setCardFontSize;
const getMapObject = (state) => state.mapObj;

const LandingPage = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const mapObj = useSettingsStore(getMapObject);
  const dataLoaded = useStore(getDataLoaded);
  const setCurrentPage = useStore(getSetCurrentPage);
  const setProgressScore = useStore(getSetProgressScore);
  const setUrlUsercode = useStore(getSetUrlUsercode);
  const results = useStore(getResults);
  const setResults = useStore(getSetResults);
  let displayLandingContent = useStore(getDisplayLandingContent);
  const setDisplayNextButton = useStore(getSetDisplayNextButton);
  const setCardFontSize = useStore(getSetCardFontSize);

  const headerBarColor = configObj.headerBarColor;
  const landingHead = ReactHtmlParser(decodeHTML(langObj.landingHead));
  const welcomeTextHtml = ReactHtmlParser(decodeHTML(langObj.welcomeText));

  useEffect(() => {
    setTimeout(() => {
      setProgressScore(10);
      setCurrentPage("landing");
    }, 100);
  }, [setProgressScore, setCurrentPage]);

  useEffect(() => {
    // display "Next" button if anonymous log in
    if (configObj.initialScreen === "anonymous") {
      setDisplayNextButton(true);
    }

    // set FONT SIZE estimate
    /*
    let fontSizeEstimate =
      5 + Math.ceil(10 * (9 / mapObj.qSortHeaderNumbers.length));

    setCardFontSize(fontSizeEstimate);
    */

    if (
      configObj.setDefaultFontSize === "true" ||
      configObj.setDefaultFontSize === true
    ) {
      setCardFontSize(configObj.defaultFontSize);
    }

    // set participant Id if set in URL
    let urlString = parseParams(window.location.href);
    // if nothing in URL, check local storage
    if (urlString === undefined || urlString === null) {
      let urlName = localStorage.getItem("urlUsercode");
      // if nothing in local storage, set to "not_set"
      if (
        urlName === null ||
        urlName === undefined ||
        urlName === "undefined"
      ) {
        console.log("no url usercode in storage");
        setUrlUsercode("not_set");
        localStorage.setItem("urlUsercode", "not_set");
      } else {
        // if something in local storage, set state
        console.log("URL usercode from storage: ", urlName);
        setUrlUsercode(`${urlName} (stored)`);
      }
    } else {
      // if something in URL, set it in state
      let codeName = urlString;
      codeName = codeName.replace(/\/|#/g, "");
      console.log("URL usercode: ", codeName);
      setUrlUsercode(codeName);
      localStorage.setItem("urlUsercode", codeName);
    }
  }, [
    setUrlUsercode,
    configObj.initialScreen,
    configObj.setDefaultFontSize,
    configObj.defaultFontSize,
    setCardFontSize,
    setDisplayNextButton,
    mapObj,
  ]);

  // calc time on page
  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const updatedResults = calculateTimeOnPage(
        startTime,
        "landingPage",
        "landingPage",
        results
      );
      setResults(updatedResults);
    };
  }, [setResults, results]);

  // check for complete
  let displayLogInScreen = false;
  let displayPartIdScreen = false;
  let displayAccessCodeScreen = false;

  if (configObj.setupTarget === "local") {
    return (
      <>
        {dataLoaded && (
          <ContainerDiv>
            <LocalStart />
          </ContainerDiv>
        )}
      </>
    );
  } else {
    // determine access mode
    const initialScreenSetting = configObj.initialScreen;
    if (initialScreenSetting === "anonymous") {
      displayLandingContent = true;
    }
    if (
      initialScreenSetting === "partId-access" &&
      displayLandingContent === false
    ) {
      displayLogInScreen = true;
    }
    if (initialScreenSetting === "partId" && displayLandingContent === false) {
      displayPartIdScreen = true;
    }
    if (initialScreenSetting === "access" && displayLandingContent === false) {
      displayAccessCodeScreen = true;
    }

    // if isIE, hide all content except warning.
    let isIeBrowser = checkForIeBrowser();
    if (isIeBrowser) {
      displayLandingContent = false;
      displayLogInScreen = false;
      displayAccessCodeScreen = false;
      displayPartIdScreen = false;
    }

    return (
      <React.Fragment>
        {dataLoaded && (
          <React.Fragment>
            <SortTitleBar background={headerBarColor}>
              {landingHead}
            </SortTitleBar>
            <LandingModal />
            <ContainerDiv>
              {isIeBrowser && <InternetExplorerWarning />}
              {displayLogInScreen && <LogInScreen />}
              {displayPartIdScreen && <PartIdScreen />}
              {displayAccessCodeScreen && <AccessCodeScreen />}
              {displayLandingContent && (
                <ContentDiv>
                  <div>{welcomeTextHtml}</div>
                </ContentDiv>
              )}
            </ContainerDiv>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
};

export default LandingPage;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
  padding-top: 50px;
  transition: 0.3s ease all;
  margin-top: 50px;

  img {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  iframe {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  width: 75vw;
  font-size: 1.25em;
  visibility: ${(props) => (props.view ? "hidden" : "visible")};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
  justify-content: center;
  align-items: center;
`;

const SortTitleBar = styled.div`
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 8px;
  min-height: 50px;
  background-color: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
  position: fixed;
  top: 0;
`;
