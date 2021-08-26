import React, { useEffect } from "react";
import { view, store } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import SortGrid from "./SortGrid";
import styled from "styled-components";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import SortHelpModal from "./SortHelpModal";

const localStore = store({
  topMargin: 50,
});

const Sort = () => {
  const cardFontSize = getGlobalState("cardFontSize");
  const langObj = getGlobalState("langObj");
  const configObj = getGlobalState("configObj");
  const headerBarColor = configObj.headerBarColor;

  useEffect(() => {
    /* this is to adjust the margin of the sort grid because I can't know
     the size - it will depend on how much the researcher writes in the 
     "conditions of instruction" section - so, I grab the height of titleBar 
     after render and reset the margin
    */
    const sortGridMarginTop = JSON.parse(
      localStorage.getItem("sortGridMarginTop")
    );
    if (sortGridMarginTop === undefined || sortGridMarginTop === null) {
      setTimeout(() => {
        const height = document.getElementById("sortTitleBar").clientHeight;
        const height2 = height;
        localStore["topMargin"] = height2;
        localStorage.setItem("sortGridMarginTop", JSON.stringify(height2));
      }, 300);
    } else {
      localStore["topMargin"] = +sortGridMarginTop;
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setGlobalState("currentPage", "sort");
    }, 200);
  }, []);

  // calc time on page
  useEffect(() => {
    let startTime;
    startTime = Date.now();
    return () => {
      calculateTimeOnPage(startTime, "sortPage", "SortPage");
    };
  }, []);

  return (
    <React.Fragment>
      <SortHelpModal />
      <SortTitleBar id="sortTitleBar" background={headerBarColor}>
        <Disagree>{langObj.sortDisagreement}</Disagree>
        <CondOfInst fontSize={configObj.condOfInstFontSize}>
          {langObj.condOfInst}
        </CondOfInst>
        <Agree>{langObj.sortAgreement}</Agree>
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
