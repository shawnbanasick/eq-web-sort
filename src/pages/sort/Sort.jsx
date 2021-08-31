import React, { useEffect } from "react";
import { view, store } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import SortGrid from "./SortGrid";
import styled from "styled-components";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import SortHelpModal from "./SortHelpModal";
import SortingFinishedModal from "../../utilities/SortingFinishedModal";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

const localStore = store({
  topMargin: 50,
});

const Sort = () => {
  const cardFontSize = getGlobalState("cardFontSize");
  const configObj = getGlobalState("configObj");
  const headerBarColor = configObj.headerBarColor;

  // setup language
  const langObj = getGlobalState("langObj");
  const sortDisagreement = ReactHtmlParser(
    decodeHTML(langObj.sortDisagreement)
  );
  const sortAgreement = ReactHtmlParser(decodeHTML(langObj.sortAgreement));
  const condOfInst = ReactHtmlParser(decodeHTML(langObj.condOfInst));

  useEffect(() => {
    /* this should adjust the margin of the sort grid because I can't know
     the size - it will depend on how much the researcher writes in the 
     "conditions of instruction" section - so, I grab the height of titleBar 
     after render and reset the margin
    */
    const sortGridMarginTop = JSON.parse(
      localStorage.getItem("sortGridMarginTop")
    );
    const height = document.getElementById("sortTitleBar").clientHeight;
    if (sortGridMarginTop !== height) {
      setTimeout(() => {
        localStore["topMargin"] = height;
        localStorage.setItem("sortGridMarginTop", JSON.stringify(height));
      }, 300);
    } else {
      localStore["topMargin"] = +sortGridMarginTop;
    }
  }, []);

  useEffect(() => {
    setGlobalState("presortNoReturn", true);
    setTimeout(() => {
      setGlobalState("currentPage", "sort");
    }, 200);
  }, []);

  // calc time on page
  useEffect(() => {
    let startTime;
    startTime = Date.now();
    return () => {
      calculateTimeOnPage(startTime, "sortPage", "sortPage");
    };
  }, []);

  return (
    <React.Fragment>
      <SortHelpModal />
      <SortingFinishedModal />
      <SortTitleBar id="sortTitleBar" background={headerBarColor}>
        <Disagree>{sortDisagreement}</Disagree>
        <CondOfInst fontSize={configObj.condOfInstFontSize}>
          {condOfInst}
        </CondOfInst>
        <Agree>{sortAgreement}</Agree>
      </SortTitleBar>
      <SortGridContainer marginTop={localStore.topMargin}>
        <SortGrid cardFontSize={cardFontSize} />;
      </SortGridContainer>
    </React.Fragment>
  );
};

export default view(Sort);

const SortTitleBar = styled.div`
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-bottom: 5px;
  min-height: 50px;
  display: inline-grid;
  grid-template-columns: 15% 1fr 15%;
  color: black;
  font-weight: bold;
  background-color: ${(props) => props.background};
  position: fixed;
  z-index: 99;
  top: 0;
`;

const CondOfInst = styled.div`
  color: white;
  max-width: 80vw;
  font-size: ${(props) => `${props.fontSize}px`};
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  align-self: end;
`;

const Agree = styled.div`
  font-size: 22px;
  align-self: end;
  justify-self: end;
  color: white;
  padding-bottom: 5px;
`;

const Disagree = styled.div`
  font-size: 22px;
  align-self: end;
  justify-self: start;
  color: white;
  padding-bottom: 5px;
`;

const SortGridContainer = styled.div`
  margin-top: ${(props) => `${props.marginTop}px`};
`;
