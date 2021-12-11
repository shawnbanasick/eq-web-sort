import React, { useState, useEffect } from "react";
import { view, store } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import SortGrid from "./SortGrid";
import styled from "styled-components";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import SortHelpModal from "./SortHelpModal";
import SortingFinishedModal from "../../utilities/SortingFinishedModal";
import PreventSortNavModal from "./PreventSortNavModal";
import OverloadedColumnModal from "./OverloadedColumnModal";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import SortColGuides from "./SortColGuides";

const localStore = store({
  topMargin: 50,
});

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

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

  // force updates on window resize
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: document.body.clientWidth,
  });

  // page resize
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: document.body.clientWidth,
      });
    }, 200);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  useEffect(() => {
    /* this should adjust the margin of the sort grid because I can't know
     the size - it will depend on how much the researcher writes in the 
     "conditions of instruction" section - so, I grab the height of titleBar 
     after render and reset the margin
    */
    const sortGridMarginTop = +JSON.parse(
      localStorage.getItem("sortGridMarginTop")
    );
    let height = document.getElementById("sortTitleBarContainer").clientHeight;

    height = +JSON.stringify(height);

    setTimeout(() => {
      if (sortGridMarginTop !== height) {
        console.log("not equal");
        localStore["topMargin"] = height;
        localStorage.setItem("sortGridMarginTop", JSON.stringify(height));
      } else {
        console.log("equal");
        localStore["topMargin"] = +sortGridMarginTop;
      }
    }, 200);
  });

  useEffect(() => {
    setGlobalState("presortNoReturn", true);
    setTimeout(() => {
      setGlobalState("currentPage", "sort");
    }, 300);
  }, []);

  // calc time on page
  useEffect(() => {
    let startTime;
    startTime = Date.now();
    return () => {
      calculateTimeOnPage(startTime, "sortPage", "sortPage");
    };
  }, []);

  let columnWidth = getGlobalState("columnWidth");

  return (
    <React.Fragment>
      <SortHelpModal />
      <PreventSortNavModal />
      <SortingFinishedModal />
      <OverloadedColumnModal />
      <SortTitleBarContainer id="sortTitleBarContainer">
        <SortTitleBar id="sortTitleBar" background={headerBarColor}>
          <Disagree>{sortDisagreement}</Disagree>
          <CondOfInst fontSize={configObj.condOfInstFontSize}>
            {condOfInst}
          </CondOfInst>
          <Agree>{sortAgreement}</Agree>
        </SortTitleBar>
        <SortColGuides columnWidth={columnWidth} />
      </SortTitleBarContainer>
      <SortGridContainer marginTop={localStore.topMargin}>
        <SortGrid dimensions={dimensions} cardFontSize={cardFontSize} />;
      </SortGridContainer>
    </React.Fragment>
  );
};

export default view(Sort);

const SortTitleBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 999;
`;

const SortTitleBar = styled.div`
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-bottom: 5px;
  display: inline-grid;
  grid-template-columns: 15% 1fr 15%;
  color: black;
  font-weight: bold;
  background-color: ${(props) => props.background};
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
  margin-right: 20px;
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
