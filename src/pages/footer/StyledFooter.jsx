import React from "react";
import styled from "styled-components";
import NextButton from "./NextButton";
import FooterFontSizer from "./FooterFontSizer";
import CardHeightSizer from "./CardHeightSizer";
import { view } from "@risingstack/react-easy-state";
import ProgressBar from "@ramonak/react-progress-bar";
import getGlobalState from "../../globalState/getGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import calcProgressScore from "./calcProgressScore";
import HelpButton from "./HelpButton";
import getNextPage from "./getNextPage";

const StyledFooter = () => {
  // setup configs
  const configObj = getGlobalState("configObj");
  const initialScreenSetting = configObj.initialScreen;
  let displayNextButton = getGlobalState("displayNextButton");
  const currentPage = getGlobalState("currentPage");
  const additionalProgress = getGlobalState("progressScoreAdditional");
  const additionalProgressSort = getGlobalState("progressScoreAdditionalSort");
  let showAdjustmentContainer = true;
  let showCardHeightSizer = true;

  // setup language
  const langObj = getGlobalState("langObj");
  const logoHtml = ReactHtmlParser(decodeHTML(configObj.footerLogo));
  const nextButtonText = ReactHtmlParser(decodeHTML(langObj.btnNext));

  // todo - fix properly so no escaping log in
  if (currentPage !== "landing") {
    displayNextButton = true;
  }
  if (initialScreenSetting === "anonymous") {
    displayNextButton = true;
  }

  const totalProgressScore = calcProgressScore(
    currentPage,
    additionalProgress,
    additionalProgressSort
  );

  if (currentPage === "submit") {
    displayNextButton = false;
  }

  if (currentPage === "presort") {
    showAdjustmentContainer = true;
    showCardHeightSizer = false;
  }
  if (
    currentPage === "landing" ||
    currentPage === "survey" ||
    currentPage === "submit"
  ) {
    showAdjustmentContainer = false;
  }

  let CenterContent = (
    <React.Fragment>
      <HelpButton />
      {showAdjustmentContainer && (
        <AdjustmentsContainer>
          <FooterFontSizer />
          {showCardHeightSizer && <CardHeightSizer />}
        </AdjustmentsContainer>
      )}
      <ProgressBarDiv>
        <ProgressBar
          completed={totalProgressScore}
          width={"150px"}
          bgColor="#337ab7"
          labelColor="#f0f0f0"
          baseBgColor="lightgray"
        />
      </ProgressBarDiv>
    </React.Fragment>
  );

  const nextPage = getNextPage(currentPage);

  return (
    <StyledFooterDiv>
      <LogoContainer>{logoHtml}</LogoContainer>
      <CenterDiv>{CenterContent}</CenterDiv>
      {displayNextButton && (
        <NextButton to={nextPage}>{nextButtonText}</NextButton>
      )}
    </StyledFooterDiv>
  );
};

export default view(StyledFooter);

const StyledFooterDiv = styled.footer`
  position: fixed;
  bottom: 0px;
  left: 0px;
  border-top: 1px solid lightgray;

  display: inline-grid;
  grid-template-columns: 16% 1fr 16%;
  align-items: center;
`;

const AdjustmentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
`;

const ProgressBarDiv = styled.div`
  align-self: center;
  justify-self: center;
  margin-left: 25px;
`;

const LogoContainer = styled.div`
  padding-top: 5px;
  display: flex;
  justify-self: start;
  align-self: center;
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
