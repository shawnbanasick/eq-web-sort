import React, { useEffect } from "react";
import setGlobalState from "../../globalState/setGlobalState";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import LowCards from "./LowCards";
import LowCards2 from "./LowCards2";
import HighCards from "./HighCards";
import HighCards2 from "./HighCards2";
import NeutralCards from "./NeutralCards";
import styled from "styled-components";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import decodeHTML from "../../utilities/decodeHTML";
import ReactHtmlParser from "react-html-parser";
import PostsortHelpModal from "./PostsortHelpModal";

/* eslint react/prop-types: 0 */
const results = getGlobalState("results");

const PostSort = () => {
  const langObj = getGlobalState("langObj");
  const configObj = getGlobalState("configObj");
  const headerBarColor = configObj.headerBarColor;
  const postsortInstructions = ReactHtmlParser(
    decodeHTML(langObj.postsortInstructions)
  );

  useEffect(() => {
    let startTime;
    startTime = Date.now();
    setGlobalState("currentPage", "postsort");
    setGlobalState("progressScore", 50);

    return () => {
      calculateTimeOnPage(startTime, "postSortPage", "PostSortPage");
    };
  }, []);

  const qSortPattern = configObj.qSortPattern;
  const qSortHeaderNumbers = configObj.qSortHeaderNumbers;

  const highCardNum = +qSortPattern[qSortPattern.length - 1];
  const highCardVal = +qSortHeaderNumbers[qSortHeaderNumbers.length - 1];

  const highCard2Num = +qSortPattern[qSortPattern.length - 2];
  const highCard2Val = +qSortHeaderNumbers[qSortHeaderNumbers.length - 2];

  const lowCardNum = +qSortPattern[0];
  const lowCardVal = +qSortHeaderNumbers[0];

  const lowCard2Num = +qSortPattern[1];
  const lowCard2Val = +qSortHeaderNumbers[1];

  const maxValue = Math.max(...qSortPattern);

  const neuCardNum = maxValue;
  const neuCardVal = 0;

  const length = highCardNum;
  for (let i = 0; i < length; i++) {
    results[`column${highCardVal}_${i + 1}`] = "no response";
  }
  setGlobalState("results", results);

  // pull data from localStorage
  const columnStatements = getGlobalState("columnStatements");
  const cardHeight = getGlobalState("cardHeight");
  const cardFontSize = getGlobalState("cardFontSize");
  const columnWidth = 250;

  const titleText = langObj.postsortHeader;
  const agree = langObj.postsortAgreement;
  const disagree = langObj.postsortDisagreement;
  const neutral = langObj.postsortNeutral;
  const placeholder = langObj.placeholder;

  const postsortAgreeColDisp1 = configObj.postsortAgreeColDisp1;
  const postsortAgreeColDisp2 = configObj.postsortAgreeColDisp2;
  const showSecondPosColumn = configObj.showSecondPosColumn;
  const postsortDisagreeColDisp1 = configObj.postsortDisagreeColDisp1;
  const postsortDisagreeColDisp2 = configObj.postsortDisagreeColDisp2;
  const showSecondNegColumn = configObj.showSecondNegColumn;

  const agreeObj = {};
  agreeObj.agreeText = agree;
  agreeObj.columnDisplay = [postsortAgreeColDisp1];
  agreeObj.columnDisplay2 = [postsortAgreeColDisp2];
  agreeObj.displaySecondColumn = showSecondPosColumn;
  agreeObj.placeholder = placeholder;

  const neutralObj = {};
  neutralObj.neutralText = neutral;
  neutralObj.displayNeutralObjects = configObj.displayNeutralObjects;
  neutralObj.columnDisplay = ["column0"];
  neutralObj.placeholder = placeholder;

  const disagreeObj = {};
  disagreeObj.disagreeText = disagree;
  disagreeObj.columnDisplay = [postsortDisagreeColDisp1];
  disagreeObj.columnDisplay2 = [postsortDisagreeColDisp2];
  disagreeObj.displaySecondColumn = showSecondNegColumn;
  disagreeObj.placeholder = placeholder;

  const highCards = columnStatements.vCols[agreeObj.columnDisplay];
  const highCards2 = columnStatements.vCols[agreeObj.columnDisplay2];
  const neutralCards = columnStatements.vCols[neutralObj.columnDisplay];
  const lowCards = columnStatements.vCols[disagreeObj.columnDisplay];
  const lowCards2 = columnStatements.vCols[disagreeObj.columnDisplay2];

  return (
    <div>
      <PostsortHelpModal />
      <SortTitleBar background={headerBarColor}>{titleText}</SortTitleBar>
      <CardsContainer>
        <PostsortInstructions>{postsortInstructions}</PostsortInstructions>
        <HighCards
          agreeObj={agreeObj}
          height={cardHeight}
          cardFontSize={cardFontSize}
          highCardNum={highCardNum}
          highCardVal={highCardVal}
          width={columnWidth}
          highCards={highCards}
          columnDisplay={agreeObj.columnDisplay}
          columnStatements={columnStatements}
        />

        {agreeObj.displaySecondColumn && (
          <HighCards2
            agreeObj={agreeObj}
            height={cardHeight}
            cardFontSize={cardFontSize}
            highCard2Num={highCard2Num}
            highCard2Val={highCard2Val}
            width={columnWidth}
            highCards2={highCards2}
            columnDisplay={agreeObj.columnDisplay2}
            columnStatements={columnStatements}
          />
        )}

        {neutralObj.displayNeutralObjects && (
          <NeutralCards
            neutralObj={neutralObj}
            height={cardHeight}
            width={columnWidth}
            neuCardNum={neuCardNum}
            neuCardVal={neuCardVal}
            cardFontSize={cardFontSize}
            columnDisplay={neutralObj.columnDisplay}
            neutralCards={neutralCards}
            columnStatements={columnStatements}
          />
        )}

        {disagreeObj.displaySecondColumn && (
          <LowCards2
            disagreeObj={disagreeObj}
            height={cardHeight}
            width={columnWidth}
            lowCard2Num={lowCard2Num}
            lowCard2Val={lowCard2Val}
            lowCards2={lowCards2}
            cardFontSize={cardFontSize}
            columnStatements={columnStatements}
            columnDisplay={disagreeObj.columnDisplay2}
          />
        )}

        <LowCards
          disagreeObj={disagreeObj}
          height={cardHeight}
          width={columnWidth}
          lowCardNum={lowCardNum}
          lowCardVal={lowCardVal}
          cardFontSize={cardFontSize}
          lowCards={lowCards}
          columnStatements={columnStatements}
          columnDisplay={disagreeObj.columnDisplay}
        />
      </CardsContainer>
    </div>
  );
};

export default view(PostSort);

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 150px;
  margin-top: 50px;
`;

const SortTitleBar = styled.div`
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 5px;
  min-height: 50px;
  background-color: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
  position: fixed;
  top: 0;
`;

const PostsortInstructions = styled.div`
  margin-top: 30px;
  width: 90vw;
  color: black;
  font-size: 18px;
`;
