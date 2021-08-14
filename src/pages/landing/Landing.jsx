import React, { useEffect, Suspense } from "react";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";

const LandingPage = () => {
  useEffect(() => {
    setTimeout(() => {
      setGlobalState("progressScore", 10);
    }, 100);
    setGlobalState("currentPage", "landing");
  }, []);

  const dataLoaded = getGlobalState("dataLoaded");
  const languageObject = getGlobalState("languageObject");

  const getWelcomeText = () => {
    let welcomeText1 = languageObject.welcomeText;
    const charReplace = { "{": "<", "}": ">" };
    let welcomeText = welcomeText1.replace(/{|}/g, (char) => charReplace[char]);
    return welcomeText;
  };

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      {dataLoaded && (
        <ContainerDiv>
          <h1>{languageObject.welcomeHead}</h1>
          <ContentDiv>{ReactHtmlParser(getWelcomeText())}</ContentDiv>
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
