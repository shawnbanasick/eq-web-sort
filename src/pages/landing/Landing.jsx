import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";

const LandingPage = () => {
  setTimeout(function () {
    setGlobalState("progressScore", 10);
    setGlobalState("currentPage", "landing");
  }, 100);
  console.log(globalState);

  return (
    <ContainerDiv>
      <h1>Welcome!</h1>
      <SpanDiv>{ReactHtmlParser(window.languageXML.welcomeText)}</SpanDiv>
    </ContainerDiv>
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
