import React from "react";
import styled from "styled-components";
import NextButton from "./NextButton";
import FooterFontSizer from "./FooterFontSizer";
import CardHeightSizer from "./CardHeightSizer";
import { view } from "@risingstack/react-easy-state";
// import globalState from "../../globalState/globalState";
import ProgressBar from "@ramonak/react-progress-bar";
import getGlobalState from "../../globalState/getGlobalState";
// import setGlobalState from "../../globalState/setGlobalState";

const getNextPage = (currentPage) => {
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
    return `/survey`;
  }
  if (currentPage === "survey") {
    return `/submit`;
  }
  if (currentPage === "submit") {
    return `/`;
  }
  return `/nopagefound`;
};

const calcProgressScore = (
  currentPage,
  additionalProgress1,
  additionalProgressSort
) => {
  const additionalProgressState = +localStorage.getItem(
    "progressScoreAdditional"
  );
  const additionalProgressStateSort = +localStorage.getItem(
    "progressScoreAdditionalSort"
  );

  let totalProgressScore;
  let additionalProgress;
  if (additionalProgress1 !== additionalProgressState) {
    additionalProgress = additionalProgressState;
  }

  if (additionalProgressSort !== additionalProgressStateSort) {
    additionalProgressSort = additionalProgressStateSort;
  }

  if (currentPage === "landing") {
    totalProgressScore = 10;
    return totalProgressScore;
  }
  if (currentPage === "presort") {
    totalProgressScore = +additionalProgress + 20;
    return totalProgressScore;
  }
  if (currentPage === "sort") {
    totalProgressScore = +additionalProgressSort + 50;
    return totalProgressScore;
  }
  if (currentPage === "postsort") {
    totalProgressScore = 80;
    return totalProgressScore;
  }
  if (currentPage === "survey") {
    totalProgressScore = 90;
    return totalProgressScore;
  }
  if (currentPage === "submit") {
    totalProgressScore = 100;
    return totalProgressScore;
  }
};

const nextButtonText = localStorage.getItem("btnNext");

const StyledFooter = () => {
  const currentPage = getGlobalState("currentPage");

  const additionalProgress = getGlobalState("progressScoreAdditional");
  const additionalProgressSort = getGlobalState("progressScoreAdditionalSort");

  const totalProgressScore = calcProgressScore(
    currentPage,
    additionalProgress,
    additionalProgressSort
  );

  let displayCardHeightAdj = false;
  if (currentPage === "sort" || currentPage === "postsort") {
    displayCardHeightAdj = true;
  }

  let displayFontSizeAdj = false;
  if (
    currentPage === "sort" ||
    currentPage === "postsort" ||
    currentPage === "presort"
  ) {
    displayFontSizeAdj = true;
  }

  const nextPage = getNextPage(currentPage);

  return (
    <StyledFooterDiv>
      <AdjustmentsContainer>
        {displayFontSizeAdj && <FooterFontSizer />}
        {displayCardHeightAdj && <CardHeightSizer />}
      </AdjustmentsContainer>
      <ProgressBarDiv>
        <ProgressBar
          completed={totalProgressScore}
          width={"370px"}
          bgColor="#337ab7"
          labelColor="#f0f0f0"
          baseBgColor="lightgray"
        />
      </ProgressBarDiv>
      <NextButton to={nextPage}>{nextButtonText}</NextButton>
    </StyledFooterDiv>
  );
};

export default view(StyledFooter);

const StyledFooterDiv = styled.footer`
  position: fixed;
  bottom: 0px;
  left: 0px;

  display: inline-grid;
  grid-template-columns: 25% 1fr 25%;
  align-items: center;
`;

const AdjustmentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
`;

const ProgressBarDiv = styled.div`
  justify-self: center;
`;
