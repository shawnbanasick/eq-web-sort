import React, { useEffect, Suspense } from "react";
import setGlobalState from "../../globalState/setGlobalState";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import getGlobalState from "../../globalState/getGlobalState";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import LandingModal from "../landing/LandingModal";
import LogInScreen from "./LogInScreen";
import PartIdScreen from "./PartIdScreen";

const langObj = JSON.parse(localStorage.getItem("langObj"));
const welcomeTextHtml = decodeHTML(langObj.welcomeText);
let startTime;

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
    startTime = Date.now();
    return () => {
      calculateTimeOnPage(startTime, "landingPage", "landingPage");
    };
  }, []);

  // check for complete
  const dataLoaded = getGlobalState("dataLoaded");

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      {dataLoaded && (
        <React.Fragment>
          <SortTitleBar>{langObj.landingHead}</SortTitleBar>
          <LandingModal />
          <ContainerDiv>
            <PartIdScreen />
            <LogInScreen />
            <ContentDiv>{ReactHtmlParser(welcomeTextHtml)}</ContentDiv>
          </ContainerDiv>
        </React.Fragment>
      )}
    </Suspense>
  );
};

export default view(LandingPage);

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
  padding-top: 50px;

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
`;

const SortTitleBar = styled.div`
  width: calc(100vw-4px);
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 5px;
  min-height: 50px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
`;
