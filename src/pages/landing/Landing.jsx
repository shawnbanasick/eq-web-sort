import React, { useEffect, Suspense } from "react";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import decodeHTML from "../../utilities/decodeHTML";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";

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
        <ContainerDiv>
          <h1>{langObj.welcomeHead}</h1>
          <ContentDiv>{ReactHtmlParser(welcomeTextHtml)}</ContentDiv>
        </ContainerDiv>
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
`;

const ContentDiv = styled.div`
  width: 75vw;
  font-size: 1.25em;
`;
