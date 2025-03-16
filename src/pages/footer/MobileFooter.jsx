import React from "react";
import styled from "styled-components";
import MobileNextButton from "./MobileNextButton";
import FooterFontSizer from "./FooterFontSizer";
import CardHeightSizer from "./CardHeightSizer";
import ProgressBar from "@ramonak/react-progress-bar";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import calcProgressScore from "./calcProgressScore";
import HelpButton from "./HelpButton";
import getNextPage from "./getNextPage";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import PostsortBackButton from "./PostsortBackButton";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getDisplayNextButton = (state) => state.displayNextButton;
const getCurrentPage = (state) => state.currentPage;
const getAdditionalProgress = (state) => state.progressScoreAdditional;
const getAdditionalProgressSort = (state) => state.progressScoreAdditionalSort;
const getLocalUsercode = (state) => state.localUsercode;

const StyledFooter = () => {
  console.log("MobileFooter.jsx");
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  let displayNextButton = useStore(getDisplayNextButton);
  const currentPage = useStore(getCurrentPage);
  const additionalProgress = useStore(getAdditionalProgress);
  const additionalProgressSort = useStore(getAdditionalProgressSort);
  const localUsercode = useStore(getLocalUsercode);

  let showAdjustmentContainer = true;
  let showCardHeightSizer = true;
  let displayHelpButton = true;
  let showFooterFontSizer = true;
  let showProgressBar = false;
  let showLogo = false;

  let showBackButton;
  let backButtonText = langObj.postsortBackButtonText;

  if (currentPage === "postsort" && configObj.showBackButton) {
    showBackButton = true;
  } else {
    showBackButton = false;
  }

  let logoHtml = ReactHtmlParser(
    decodeHTML(
      `{{{center}}}{{{img src="./logo/logo.png" height="20" width="125" /}}}{{{/center}}}`
    )
  );

  let nextButtonWidth = 100;
  let nextButtonText = "";
  if (currentPage === "landing") {
    nextButtonWidth = 150;
    nextButtonText = ReactHtmlParser(decodeHTML(langObj.landingNext)) || "";
  } else {
    nextButtonText = ReactHtmlParser(decodeHTML(langObj.btnNext)) || "";
  }

  if (currentPage === "sort" && configObj.setupTarget === "local") {
    const usercode = localUsercode;
    const projectName = configObj.studyTitle;
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;

    logoHtml = `${usercode} - ${projectName} - ${dateTime}`;
  }

  const showPresort = configObj.showPresort;
  const showPostsort = configObj.showPostsort;
  const showSurvey = configObj.showSurvey;
  const useImages = configObj.useImages;
  const showConsent = configObj.showConsentPage;

  const totalProgressScore = calcProgressScore(
    currentPage,
    additionalProgress,
    additionalProgressSort,
    showPresort,
    showPostsort,
    showSurvey,
    additionalProgress,
    additionalProgressSort
  );

  if (currentPage === "submit") {
    displayNextButton = false;
  }

  if (configObj.setupTarget === "local" && currentPage === "landing") {
    displayNextButton = false;
    displayHelpButton = false;
  }
  if (currentPage === "submit") {
    displayHelpButton = false;
  }

  if (currentPage === "presort") {
    if (configObj.useImages === true) {
      showAdjustmentContainer = false;
      showCardHeightSizer = false;
    } else {
      showAdjustmentContainer = true;
      showCardHeightSizer = false;
    }
  }

  if (currentPage === "sort") {
    if (useImages === true) {
      showAdjustmentContainer = true;
      showCardHeightSizer = true;
      showFooterFontSizer = false;
    } else {
      showAdjustmentContainer = true;
      showCardHeightSizer = true;
      showFooterFontSizer = true;
    }
  }

  if (
    currentPage === "landing" ||
    currentPage === "survey" ||
    currentPage === "submit"
  ) {
    showAdjustmentContainer = false;
  }
  displayHelpButton = false;

  if (currentPage === "landing") {
    showProgressBar = false;
    showLogo = true;
  }

  let CenterContent = (
    <React.Fragment>
      {displayHelpButton && <HelpButton />}
      {showAdjustmentContainer && (
        <AdjustmentsContainer>
          {showFooterFontSizer && <FooterFontSizer />}
          {showCardHeightSizer && <CardHeightSizer />}
        </AdjustmentsContainer>
      )}
      {showProgressBar && (
        <ProgressBarDiv>
          <ProgressBar
            completed={totalProgressScore}
            width={"100px"}
            bgColor="#337ab7"
            labelColor="#f0f0f0"
            baseBgColor="lightgray"
          />
        </ProgressBarDiv>
      )}
    </React.Fragment>
  );

  const nextPage = getNextPage(
    currentPage,
    showPresort,
    showPostsort,
    showSurvey,
    showConsent
  );

  let showFooter = true;
  if (currentPage === "presort") {
    showFooter = false;
  }

  if (showFooter === false) {
    return null;
  }
  console.log(currentPage, showPresort, showPostsort, showSurvey, nextPage, showFooter);

  return (
    <StyledFooterDiv>
      {showLogo && <LogoContainer>{logoHtml}</LogoContainer>}
      <CenterDiv>{CenterContent}</CenterDiv>
      <ButtonDiv>
        {showBackButton && (
          <PostsortBackButton to={"/sort"}>{backButtonText}</PostsortBackButton>
        )}
        {displayNextButton && (
          <MobileNextButton width={nextButtonWidth} to={nextPage}>
            {nextButtonText}
          </MobileNextButton>
        )}
      </ButtonDiv>
    </StyledFooterDiv>
  );
};

export default StyledFooter;

const StyledFooterDiv = styled.footer`
  position: fixed;
  bottom: 0px;
  left: 0px;
  border-top: 1px solid lightgray;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  padding-left: 5px;
  display: flex;
  justify-self: start;
  align-self: center;
  text-align: center;
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
