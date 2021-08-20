import setGlobalState from "../../globalState/setGlobalState";
// import globalState from "../../globalState/globalState";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";

import React, { Component } from "react";
import LowCards from "./LowCards";
import LowCards2 from "./LowCards2";
import HighCards from "./HighCards";
import HighCards2 from "./HighCards2";
import NeutralCards from "./NeutralCards";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import styled from "styled-components";

/* eslint react/prop-types: 0 */

let startTime;

const langObj = JSON.parse(localStorage.getItem("langObj"));

const configObj = JSON.parse(localStorage.getItem("configObj"));

class PostSort extends Component {
  componentDidMount() {
    startTime = Date.now();
    setGlobalState("currentPage", "postsort");
    setGlobalState("progressScore", 50);
  }

  componentWillUnmount() {
    calculateTimeOnPage(startTime, "postSortPage", "PostSortPage");
  }

  render() {
    // pull data from localStorage
    const columnStatements = JSON.parse(
      localStorage.getItem("columnStatements")
    );

    // console.log(columnStatements);

    // if (!columnStatements) {
    //   console.log("no local storage");
    //   columnStatements = store.getState().columnStatements;
    // }

    // console.log(
    //   "TCL: PostSort -> render -> columnStatements",
    //   columnStatements
    // );

    const titleText = langObj.postsortHeader;

    // card appearance
    const cardFontSize = getGlobalState("cardFontSize");
    const columnWidth = 250;
    const cardHeight = getGlobalState("cardHeight");

    const instructionsText = langObj.postsortHeaderText;

    const agree = langObj.btnAgreement;
    const disagree = langObj.btnDisagreement;
    const neutral = langObj.btnNeutral;
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
        <TitleDiv>
          <h1>{titleText}</h1>
          <h3>{instructionsText}</h3>
        </TitleDiv>
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
  }
}

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

// const PostsortPage = () => {
//   setTimeout(function () {
//     setGlobalState("currentPage", "postsort");
//   }, 100);
//   console.log(globalState);

//   const isSortComplete = getGlobalState("isSortingCards");

//   return (
//     <div>
//       <h1>PostSort Page!</h1>
//     </div>
//   );
// };

// export default view(PostsortPage);
