import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import styled from "styled-components";

export function LandingPage() {
  setTimeout(function () {
    setGlobalState("currentPage", "landing");
  }, 100);
  console.log(globalState);

  return (
    <ContainerDiv>
      <h1>Welcome!</h1>
      <p>{ReactHtmlParser(window.languageXML.welcomeText)}</p>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
