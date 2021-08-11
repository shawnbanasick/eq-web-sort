import React from "react";
import styled from "styled-components";
import NextButton from "./NextButton";
import FooterFontSizer from "./FooterFontSizer";
import { view } from "@risingstack/react-easy-state";
import globalState from "../globalState/globalState";
import ProgressBar from "@ramonak/react-progress-bar";
import getGlobalState from "../globalState/getGlobalState";

const getNextPage = () => {
  const currentPage = globalState.currentPage;
  console.log(currentPage);
  if (currentPage === "landing") {
    return `/presort`;
  }
  if (currentPage === "presort") {
    return `/sort`;
  }
  if (currentPage === "sort") {
    return `/postsort`;
  }
  if (currentPage === "postsort") {
    return `/submit`;
  }
  return `/`;
};

const StyledFooter = () => {
  const progressScore = getGlobalState("progressScore");
  console.log(progressScore);

  return (
    <StyledFooterDiv>
      <FooterFontSizer />
      <ProgressBar
        completed={progressScore}
        width={"370px"}
        bgColor="#337ab7"
        labelColor="#f0f0f0"
        baseBgColor="lightgray"
      />
      <NextButton to={getNextPage()}>
        {window.languageXML.nextButtonText}
      </NextButton>
    </StyledFooterDiv>
  );
};

export default view(StyledFooter);

const StyledFooterDiv = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  position: fixed;
  bottom: 0px;
  left: 0px;
`;
