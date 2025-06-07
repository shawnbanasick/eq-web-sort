import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import LandingModal from "../landing/LandingModal";
import LogInScreen from "./LogInScreen";
import PartIdScreen from "./PartIdScreen";
import AccessCodeScreen from "./AccessCodeScreen";
import checkForIeBrowser from "./checkForIeBrowser";
import InternetExplorerWarning from "./InternetExplorerWarning";
import parseParams from "./parseParams";
import LocalStart from "./LocalStart";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
// import detectMobileBrowser from "../../utilities/detectMobileBrowser";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getDataLoaded = (state) => state.dataLoaded;
const getSetCurrentPage = (state) => state.setCurrentPage;
const getSetProgressScore = (state) => state.setProgressScore;
const getSetUrlUsercode = (state) => state.setUrlUsercode;
const getDisplayLandingContent = (state) => state.displayLandingContent;
const getSetDisplayNextButton = (state) => state.setDisplayNextButton;
const getMapObject = (state) => state.mapObj;
const getSetPostsortCommentCheckObj = (state) => state.setPostsortCommentCheckObj;
const getSetCardFontSizeSort = (state) => state.setCardFontSizeSort;
const getSetCardFontSizePostsort = (state) => state.setCardFontSizePostsort;
const getSetMinCardHeightSort = (state) => state.setMinCardHeightSort;
const getSetMinCardHeightPostsort = (state) => state.setMinCardHeightPostsort;

const LandingPage = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const mapObj = useSettingsStore(getMapObject);
  const dataLoaded = useStore(getDataLoaded);
  const setCurrentPage = useStore(getSetCurrentPage);
  const setProgressScore = useStore(getSetProgressScore);
  const setUrlUsercode = useStore(getSetUrlUsercode);
  let displayLandingContent = useStore(getDisplayLandingContent);
  const setDisplayNextButton = useStore(getSetDisplayNextButton);
  const setPostsortCommentCheckObj = useStore(getSetPostsortCommentCheckObj);
  const headerBarColor = configObj.headerBarColor;
  const landingHead = ReactHtmlParser(decodeHTML(langObj.landingHead)) || "";
  const welcomeTextHtml = ReactHtmlParser(decodeHTML(langObj.welcomeText)) || "";
  const setCardFontSizeSort = useStore(getSetCardFontSizeSort);
  const setCardFontSizePostsort = useStore(getSetCardFontSizePostsort);
  const setMinCardHeightSort = useStore(getSetMinCardHeightSort);
  const setMinCardHeightPostsort = useStore(getSetMinCardHeightPostsort);
  // const mobileWelcomeTextHtml =
  //   ReactHtmlParser(decodeHTML(langObj?.mobileWelcomeText)) || "";
  // calc time on page
  useEffect(() => {
    const startTime = Date.now();
    setProgressScore(10);
    setCurrentPage("landing");
    localStorage.setItem("currentPage", "landing");
    return () => {
      // will persist in localStorage
      calculateTimeOnPage(startTime, "landingPage", "landingPage");
    };
  }, [setCurrentPage, setProgressScore]);

  let archive;
  if (localStorage.getItem("resultsSurveyArchive" !== undefined)) {
    archive = JSON.parse(localStorage.getItem("resultsSurveyArchive"));
  }

  let surveyResults;
  if (localStorage.getItem("resultsSurvey" !== undefined)) {
    surveyResults = JSON.parse(localStorage.getItem("resultsSurvey"));
  }

  if ((surveyResults && configObj.showSurvey === "true") || configObj.showSurvey === true) {
    console.log(archive);
    console.log(configObj.requiredAnswersObj);
  }

  const isLandingReload = localStorage.getItem("currentPage");
  if (isLandingReload === "landing") {
    // localStorage.clear();

    // clear local storage if previous sorts exist
    localStorage.removeItem("columns");
    localStorage.removeItem("sortColumns");
    localStorage.removeItem("columnStatements");
    localStorage.removeItem("presortSortedCards");
    localStorage.removeItem("HC-requiredCommentsObj");
    localStorage.removeItem("LC-requiredCommentsObj");
    localStorage.removeItem("HC2-requiredCommentsObj");
    localStorage.removeItem("LC2-requiredCommentsObj");
    localStorage.removeItem("cumulativelandingPageDuration");
    localStorage.removeItem("cumulativepresortPageDuration");
    localStorage.removeItem("cumulativesortPageDuration");
    localStorage.removeItem("cumulativepostsortPageDuration");
    localStorage.removeItem("cumulativesurveyPageDuration");
    localStorage.removeItem("lastAccesslandingPage");
    localStorage.removeItem("lastAccesspresortPage");
    localStorage.removeItem("lastAccesssortPage");
    localStorage.removeItem("lastAccesspostsortPage");
    localStorage.removeItem("lastAccesssurveyPage");
    localStorage.removeItem("timeOnlandingPage");
    localStorage.removeItem("timeOnpresortPage");
    localStorage.removeItem("timeOnsortPage");
    localStorage.removeItem("timeOnpostsortPage");
    localStorage.removeItem("timeOnsurveyPage");
    localStorage.removeItem("resultsPresort");
    localStorage.removeItem("resultsSort");
    localStorage.removeItem("resultsPostsort");
    localStorage.removeItem("resultsSurvey");
    localStorage.removeItem("postsortCommentCardCount");
    localStorage.removeItem("allCommentsObj");

    if (configObj.requiredAnswersObj !== undefined) {
      localStorage.setItem("resultsSurvey", JSON.stringify(configObj.requiredAnswersObj));

      let keys = Object.keys(configObj.requiredAnswersObj);
      keys.forEach((key, index) => {
        let varName = `itemNum${index + 1}`;
        localStorage.removeItem(varName);
        localStorage.removeItem(key);
      });
    }
  }

  useEffect(() => {
    // display "Next" button if anonymous log in
    if (configObj.initialScreen === "anonymous") {
      setDisplayNextButton(true);
    }

    // PRESORT font
    if (
      configObj.setDefaultFontSizePresort === "true" ||
      configObj.setDefaultFontSizePresort === true
    ) {
      localStorage.setItem("fontSizePresort", configObj.defaultFontSizePresort);
    }

    // SORT font
    if (configObj.setDefaultFontSizeSort === "true" || configObj.setDefaultFontSizeSort === true) {
      localStorage.setItem("fontSizeSort", configObj.defaultFontSizeSort);
    }

    // SORT card height
    if (configObj.setMinCardHeightSort === "true" || configObj.setMinCardHeightSort === true) {
      localStorage.setItem("cardHeightSort", configObj.minCardHeightSort);
    }

    // POSTSORT font
    if (
      configObj.setDefaultFontSizePostsort === "true" ||
      configObj.setDefaultFontSizePostsort === true
    ) {
      setCardFontSizePostsort(configObj.defaultFontSizePostsort);
      localStorage.setItem("fontSizePostsort", configObj.defaultFontSizePostsort);
    }

    // POSTSORT card height
    if (
      configObj.setMinCardHeightPostsort === "true" ||
      configObj.setMinCardHeightPostsort === true
    ) {
      setMinCardHeightPostsort(configObj.minCardHeightPostsort);
      localStorage.setItem("cardHeightPostsort", configObj.minCardHeightPostsort);
    }

    // set participant Id if set in URL
    let urlString = parseParams(window.location.href);
    // if nothing in URL, check local storage
    if (urlString === undefined || urlString === null) {
      let urlName = localStorage.getItem("urlUsercode");
      // if nothing in local storage, set to "not_set"
      if (urlName === null || urlName === undefined || urlName === "undefined") {
        console.log("no url usercode in storage");
        setUrlUsercode("not_set");
        localStorage.setItem("urlUsercode", "not_set");
      } else {
        // if something in local storage, set state
        console.log("URL usercode from storage: ", urlName);
        if (urlName === "not_set") {
          setUrlUsercode("not_set");
        } else {
          setUrlUsercode(`${urlName} (stored)`);
        }
      }
    } else {
      // if something in URL, set it in state
      let codeName = urlString;
      codeName = codeName.replace(/\/|#/g, "");
      console.log("URL usercode: ", codeName);
      setUrlUsercode(codeName);
      localStorage.setItem("urlUsercode", codeName);
    }
  }, [
    setUrlUsercode,
    configObj.initialScreen,
    configObj.setDefaultFontSize,
    configObj.defaultFontSize,
    setDisplayNextButton,
    mapObj,
    setCardFontSizeSort,
    setCardFontSizePostsort,
    setMinCardHeightSort,
    setMinCardHeightPostsort,
    configObj,
  ]);

  // setup postsort comments object
  useEffect(() => {
    let objectKeys = Object.keys(mapObj.qSortPattern);
    let mostPos = Math.max(...objectKeys);
    let mostNeg = Math.min(...objectKeys);
    let MostPos2 = mostPos - 1;
    let MostNeg2 = mostNeg + 1;
    let highVal = mapObj.qSortPattern[mostPos];
    let highVal2 = mapObj.qSortPattern[MostPos2];
    let lowVal = mapObj.qSortPattern[mostNeg];
    let lowVal2 = mapObj.qSortPattern[MostNeg2];
    let showSecondMostPos = configObj.showSecondPosColumn;
    let showSecondMostNeg = configObj.showSecondNegColumn;
    const postsortCommentCheckObj = {};
    for (let i = 0; i < highVal; i++) {
      let key = `hc-${i}`;
      postsortCommentCheckObj[key] = false;
    }
    for (let j = 0; j < lowVal; j++) {
      let key = `lc-${j}`;
      postsortCommentCheckObj[key] = false;
    }
    if (showSecondMostPos === "true" || showSecondMostPos === true) {
      for (let k = 0; k < highVal2; k++) {
        let key = `hc2-${k}`;
        postsortCommentCheckObj[key] = false;
      }
    }
    if (showSecondMostNeg === "true" || showSecondMostNeg === true) {
      for (let l = 0; l < lowVal2; l++) {
        let key = `lc2-${l}`;
        postsortCommentCheckObj[key] = false;
      }
    }
    setPostsortCommentCheckObj(postsortCommentCheckObj);
  }, [mapObj, configObj, setPostsortCommentCheckObj]);

  // check for complete
  let displayLogInScreen = false;
  let displayPartIdScreen = false;
  let displayAccessCodeScreen = false;

  if (configObj.setupTarget === "local") {
    return (
      <>
        {dataLoaded && (
          <ContainerDiv>
            <LocalStart />
          </ContainerDiv>
        )}
      </>
    );
  } else {
    // determine access mode
    const initialScreenSetting = configObj.initialScreen;
    if (initialScreenSetting === "anonymous") {
      displayLandingContent = true;
    }
    if (initialScreenSetting === "partId-access" && displayLandingContent === false) {
      displayLogInScreen = true;
    }
    if (initialScreenSetting === "partId" && displayLandingContent === false) {
      displayPartIdScreen = true;
    }
    if (initialScreenSetting === "access" && displayLandingContent === false) {
      displayAccessCodeScreen = true;
    }

    // if isIE, hide all content except warning.
    let isIeBrowser = checkForIeBrowser();
    if (isIeBrowser) {
      displayLandingContent = false;
      displayLogInScreen = false;
      displayAccessCodeScreen = false;
      displayPartIdScreen = false;
    }

    // if (
    //   configObj.useMobileMode === true ||
    //   configObj.useMobileMode === "true"
    // ) {
    //   let isMobile = detectMobileBrowser();

    //   if (isMobile) {
    //     return (
    //       <React.Fragment>
    //         {dataLoaded && (
    //           <React.Fragment>
    //             <MobileSortTitleBar background={headerBarColor}>
    //               {landingHead}
    //             </MobileSortTitleBar>
    //             <MobileContainerDiv>
    //               <MobileContentDiv>
    //                 <div>{mobileWelcomeTextHtml}</div>
    //               </MobileContentDiv>
    //             </MobileContainerDiv>
    //           </React.Fragment>
    //         )}
    //       </React.Fragment>
    //     );
    //   }
    // }

    return (
      <React.Fragment>
        {dataLoaded && (
          <React.Fragment>
            <SortTitleBar background={headerBarColor}>{landingHead}</SortTitleBar>
            <LandingModal />
            <ContainerDiv>
              {isIeBrowser && <InternetExplorerWarning />}
              {displayLogInScreen && <LogInScreen />}
              {displayPartIdScreen && <PartIdScreen />}
              {displayAccessCodeScreen && <AccessCodeScreen />}
              {displayLandingContent && (
                <ContentDiv>
                  <div>{welcomeTextHtml}</div>
                </ContentDiv>
              )}
            </ContainerDiv>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
};

export default LandingPage;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
  padding-top: 50px;
  transition: 0.3s ease all;
  margin-top: 50px;

  img {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  iframe {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const MobileContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
  padding-top: 50px;
  transition: 0.3s ease all;
  margin-top: 50px;

  img {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  iframe {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  width: 75vw;
  font-size: 1.25em;
  visibility: ${(props) => (props.view ? "hidden" : "visible")};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
  justify-content: center;
  align-items: center;
`;

const MobileContentDiv = styled.div`
  display: flex;
  width: 75vw;
  font-size: 3.1vh;
  visibility: ${(props) => (props.view ? "hidden" : "visible")};
  animation: ${(props) => (props.view ? fadeOut : fadeIn)} 0.5s linear;
  transition: visibility 0.5s linear;
  justify-content: center;
  align-items: center;
`;

const SortTitleBar = styled.div`
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 8px;
  min-height: 50px;
  background-color: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
  position: fixed;
  top: 0;
`;

const MobileSortTitleBar = styled.div`
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 8px;
  min-height: 50px;
  background-color: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  position: fixed;
  top: 0;
`;
