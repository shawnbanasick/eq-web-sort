import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { view } from "@risingstack/react-easy-state";
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

const LandingPage = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const configObj = useSettingsStore((state) => state.configObj);
  const dataLoaded = useStore((state) => state.dataLoaded);
  const headerBarColor = configObj.headerBarColor;
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setProgressScore = useStore((state) => state.setProgressScore);
  const setUsercode = useStore((state) => state.setUsercode);
  const results = useStore((state) => state.results);
  const setResults = useStore((state) => state.setResults);

  let displayLandingContent = useStore((state) => state.displayLandingContent);

  const landingHead = ReactHtmlParser(decodeHTML(langObj.landingHead));
  const welcomeTextHtml = ReactHtmlParser(decodeHTML(langObj.welcomeText));

  useEffect(() => {
    setTimeout(() => {
      setProgressScore(10);
      setCurrentPage("landing");
    }, 100);
  }, [setProgressScore, setCurrentPage]);

  useEffect(() => {
    let urlName = parseParams(window.location.href);
    if (urlName !== undefined) {
      console.log(urlName.usercode);
      const codeName = urlName.usercode;
      setUsercode(codeName);
    }
  }, [setUsercode]);

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

  if (configObj.firebaseOrLocal === "local") {
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
                <ContentDiv>{welcomeTextHtml}</ContentDiv>
              )}
            </ContainerDiv>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
};

export default view(LandingPage);

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
  width: 75vw;
  font-size: 1.25em;
  visibility: ${(props) => (props.view ? "hidden" : "visible")};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
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
