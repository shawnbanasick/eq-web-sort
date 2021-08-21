import React, { useEffect, Suspense } from "react";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
// import testImage from "../../../images/testImage.png";

const LandingPage = () => {
  const langObj = JSON.parse(localStorage.getItem("langObj"));
  useEffect(() => {
    setTimeout(() => {
      setGlobalState("progressScore", 10);
    }, 100);
    setGlobalState("currentPage", "landing");
    localStorage.setItem("progressScore", 10);
  }, []);

  const dataLoaded = getGlobalState("dataLoaded");
  // const langObj = getGlobalState("languageObject");

  // console.log(JSON.stringify(langObj, null, 2));
  // localStorage.setItem("langObj", JSON.stringify(langObj));

  const getWelcomeText = () => {
    let welcomeText1 = langObj.welcomeText;
    const charReplace = { "{": "<", "}": ">" };
    let welcomeText = welcomeText1.replace(/{|}/g, (char) => charReplace[char]);
    return welcomeText;
  };

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      {dataLoaded && (
        <ContainerDiv>
          <h1>{langObj.welcomeHead}</h1>
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
