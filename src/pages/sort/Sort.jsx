import React, { useState, useEffect, useMemo } from "react";
import SortGrid from "./SortGrid";
import SortGridImages from "./SortGridImages";
import styled from "styled-components";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import SortHelpModal from "./SortHelpModal";
import SortingFinishedModal from "../../utilities/SortingFinishedModal";
import PreventSortNavModal from "./PreventSortNavModal";
import OverloadedColumnModal from "./OverloadedColumnModal";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import SortColGuides from "./SortColGuides";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import PromptUnload from "../../utilities/PromptUnload";

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

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getMapObj = (state) => state.mapObj;
const getCardFontSize = (state) => state.cardFontSize;
const getTopMargin = (state) => state.topMargin;
const getSetPresortNoReturn = (state) => state.setPresortNoReturn;
const getSetCurrentPage = (state) => state.setCurrentPage;
const getSetTopMargin = (state) => state.setTopMargin;
const getSetDisplayNextButton = (state) => state.setDisplayNextButton;
const getBypassSort = (state) => state.bypassSort;
const getSetCardFontSize = (state) => state.setCardFontSize;

const Sort = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const mapObj = useSettingsStore(getMapObj);
  const configObj = useSettingsStore(getConfigObj);
  const imageSort = configObj.useImages;

  let cardFontSize = useStore(getCardFontSize);
  // const columnWidth = useStore(getColumnWidth);
  const topMargin = useStore(getTopMargin);
  const setPresortNoReturn = useStore(getSetPresortNoReturn);
  const setCurrentPage = useStore(getSetCurrentPage);
  const setTopMargin = useStore(getSetTopMargin);
  const setDisplayNextButton = useStore(getSetDisplayNextButton);
  const bypassSort = useStore(getBypassSort);
  const setCardFontSize = useStore(getSetCardFontSize);

  // force updates on window resize
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: document.body.clientWidth,
  });

  const [columnWidth, setColumnWidth] = useState(150);

  // set default font size
  useEffect(() => {
    if (
      (configObj.setDefaultFontSizeSort === true && bypassSort === false) ||
      (configObj.setDefaultFontSizeSort === "true" && bypassSort === false)
    ) {
      /* eslint-disable-next-line */
      cardFontSize = configObj.defaultFontSizeSort;
      setCardFontSize(configObj.defaultFontSizeSort);
    }
  }, [configObj, bypassSort, setCardFontSize]);

  // set next button display
  setDisplayNextButton(true);

  const headerBarColor = configObj.headerBarColor;
  const fontColor = configObj.defaultFontColor;

  const sortDisagreement = ReactHtmlParser(
    decodeHTML(langObj.sortDisagreement)
  );
  const sortAgreement = ReactHtmlParser(decodeHTML(langObj.sortAgreement));
  const condOfInst = ReactHtmlParser(decodeHTML(langObj.condOfInst));

  const qSortPattern = [...mapObj.qSortPattern];
  const qlength = qSortPattern.length;

  const visibleWidthAdjust = useMemo(() => {
    // less than -3
    // -6 to +6
    if (qlength > 12) {
      return 170;
    }
    // -5 to +5
    if (qlength > 10) {
      return 145;
    }
    // -4 to +4
    if (qlength > 8) {
      return 120;
    }
    // -3 to +3
    if (qlength > 6) {
      return 96;
    }

    if (qlength > 0) {
      return 70;
    }
  }, [qlength]);

  // page resize
  useEffect(() => {
    const columnWidth =
      (dimensions.width - visibleWidthAdjust) / qSortPattern.length;
    setColumnWidth(columnWidth);

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
  }, [dimensions, qSortPattern.length, visibleWidthAdjust]);

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
        setTopMargin(height);
        localStorage.setItem("sortGridMarginTop", JSON.stringify(height));
      } else {
        setTopMargin(+sortGridMarginTop);
      }
    }, 50);
  });

  useEffect(() => {
    let startTime = Date.now();
    const setStateAsync = async () => {
      await setPresortNoReturn(true);
      await setCurrentPage("sort");
    };
    setStateAsync();
    return () => {
      calculateTimeOnPage(startTime, "sortPage", "sortPage");
    };
  }, [setPresortNoReturn, setCurrentPage]);

  return (
    <React.Fragment>
      <PromptUnload />
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
      <SortGridContainer marginTop={topMargin}>
        {imageSort ? (
          <SortGridImages
            id="sortGridImages"
            dimensions={dimensions}
            cardFontSize={cardFontSize}
            fontColor={fontColor}
            columnWidth={columnWidth}
          />
        ) : (
          <SortGrid
            dimensions={dimensions}
            cardFontSize={cardFontSize}
            fontColor={fontColor}
            columnWidth={columnWidth}
          />
        )}
        ;
      </SortGridContainer>
    </React.Fragment>
  );
};

export default Sort;

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
