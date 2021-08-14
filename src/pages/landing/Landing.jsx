import React, { useEffect, Suspense } from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";

const LandingPage = () => {
  useEffect(() => {
    setGlobalState("progressScore", 10);
    setGlobalState("currentPage", "landing");
  }, []);

  const dataLoaded = getGlobalState("dataLoaded");
  const languageObject = getGlobalState("languageObject");

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      {dataLoaded && (
        <ContainerDiv>
          <h1>{languageObject.welcomeHead}</h1>
          <SpanDiv>{ReactHtmlParser(languageObject.welcomeText)}</SpanDiv>
        </ContainerDiv>
      )}
    </Suspense>
  );
};

export default view(LandingPage);

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SpanDiv = styled.span`
  font-size: 1.25em;
`;
