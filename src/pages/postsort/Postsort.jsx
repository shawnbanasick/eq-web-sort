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

/* eslint react/prop-types: 0 */

let startTime;

const langObj = JSON.parse(localStorage.getItem("langObj"));

const configObj = JSON.parse(localStorage.getItem("configObj"));

const PostSort = () => {
  useEffect(() => {
    startTime = Date.now();
    setGlobalState("currentPage", "postsort");
    setGlobalState("progressScore", 50);

    return () => {
      calculateTimeOnPage(startTime, "postSortPage", "PostSortPage");
    };
  }, []);

  // pull data from localStorage
  const columnStatements = JSON.parse(localStorage.getItem("columnStatements"));

  const titleText = langObj.postsortHeader;

  // todo - clean up reactivity - card appearance
  const cardFontSize = getGlobalState("cardFontSize");
  const cardHeight2 = getGlobalState("cardHeight");
  const cardHeight = +JSON.parse(localStorage.getItem("cardHeight"));
  console.log(cardHeight2);

  const columnWidth = 250;

  const instructionsText = langObj.postsortHeaderText;

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
      <SortTitleBar>{titleText}</SortTitleBar>
      <CardsContainer>
        <HighCards
          agreeObj={agreeObj}
          height={cardHeight}
          cardFontSize={cardFontSize}
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
`;

const TitleDiv = styled.div`
  display: flex;
  padding: 20px;
  height: auto;
  background: steelblue;
  overflow: hidden;

  h1 {
    color: white;
    font-size: 36px;
    margin-left: 30px;
  }

  h3 {
    color: white;
    width: 80%;
    height: 50px;
    font-size: 22px;
    margin-left: 30px;
  }
`;

const SortTitleBar = styled.div`
  width: calc(100vw-4px);
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 5px;
  min-height: 50px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
`;
