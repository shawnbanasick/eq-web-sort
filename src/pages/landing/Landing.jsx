import React, { useEffect } from "react";
import setGlobalState from "../../globalState/setGlobalState";
import styled, { keyframes } from "styled-components";
import { view } from "@risingstack/react-easy-state";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import getGlobalState from "../../globalState/getGlobalState";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import LandingModal from "../landing/LandingModal";
import LogInScreen from "./LogInScreen";
import PartIdScreen from "./PartIdScreen";
import AccessCodeScreen from "./AccessCodeScreen";

const LandingPage = () => {
  useEffect(() => {
    setTimeout(() => {
      setGlobalState("progressScore", 10);
    }, 100);
    setGlobalState("currentPage", "landing");
    localStorage.setItem("progressScore", 10);
  }, []);

  // calc time on page
  useEffect(() => {
    const startTime = Date.now();
    return () => {
      calculateTimeOnPage(startTime, "landingPage", "landingPage");
    };
  }, []);

  // config options
  const configObj = getGlobalState("configObj");
  const headerBarColor = configObj.headerBarColor;

  // language options
  const langObj = getGlobalState("langObj");
  const dataLoaded = getGlobalState("dataLoaded");
  const welcomeTextHtml = ReactHtmlParser(decodeHTML(langObj.welcomeText));
  const landingHead = ReactHtmlParser(decodeHTML(langObj.landingHead));

  // check for complete
  let displayLandingContent = getGlobalState("displayLandingContent");
  let displayLogInScreen = false;
  let displayPartIdScreen = false;
  let displayAccessCodeScreen = false;
  const initialScreenSetting = configObj.initialScreen;
  if (initialScreenSetting === "anonymous") {
    displayLandingContent = true;
    setGlobalState("displayNextButton", true);
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

  return (
    <React.Fragment>
      {dataLoaded && (
        <React.Fragment>
          <SortTitleBar background={headerBarColor}>{landingHead}</SortTitleBar>
          <LandingModal />
          <ContainerDiv>
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
  align-content: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
  position: fixed;
  top: 0;
`;
