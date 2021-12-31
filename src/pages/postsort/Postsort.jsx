import React, { useEffect } from "react";
import { view } from "@risingstack/react-easy-state";
import LowCards from "./LowCards";
import LowCards2 from "./LowCards2";
import HighCards from "./HighCards";
import HighCards2 from "./HighCards2";
import styled from "styled-components";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import decodeHTML from "../../utilities/decodeHTML";
import ReactHtmlParser from "react-html-parser";
import PostsortHelpModal from "./PostsortHelpModal";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

/* eslint react/prop-types: 0 */

const PostSort = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const configObj = useSettingsStore((state) => state.configObj);
  const mapObj = useSettingsStore((state) => state.mapObj);
  // const setCardFontSize = useStore((state) => state.setCardFontSize);
  const setProgressScore = useStore((state) => state.setProgressScore);
  const columnStatements = useSettingsStore((state) => state.columnStatements);
  const cardHeight = useStore((state) => state.cardHeight);
  const cardFontSize = useStore((state) => state.cardFontSize);
  const setCurrentPage = useStore((state) => state.setCurrentPage);

  console.log("conf: ", JSON.stringify(configObj, null, 2));
  console.log("map: ", JSON.stringify(mapObj, null, 2));

  const headerBarColor = configObj.headerBarColor;
  const postsortInstructions = ReactHtmlParser(
    decodeHTML(langObj.postsortInstructions)
  );

  useEffect(() => {
    let startTime;
    startTime = Date.now();
    setCurrentPage("postsort");
    setProgressScore(50);

    return () => {
      calculateTimeOnPage(startTime, "postsortPage", "postsortPage");
    };
  }, [setCurrentPage, setProgressScore]);

  // pull data from localStorage
  const columnWidth = 250;

  const titleText = ReactHtmlParser(decodeHTML(langObj.postsortHeader));
  const agree = ReactHtmlParser(decodeHTML(langObj.postsortAgreement));
  const disagree = ReactHtmlParser(decodeHTML(langObj.postsortDisagreement));
  // const neutral = ReactHtmlParser(decodeHTML(langObj.postsortNeutral));
  const placeholder = langObj.placeholder;

  const keys = Object.keys(mapObj.postsortConvertObj);
  const agreeColDisp1 = keys.pop();
  const agreeColDisp2 = keys.pop();
  const disagreeColDisp1 = keys.shift();
  const disagreeColDisp2 = keys.shift();

  const postsortAgreeColDisp1 = agreeColDisp1;
  const postsortAgreeColDisp2 = agreeColDisp2;
  const showSecondPosColumn = configObj.showSecondPosColumn;
  const postsortDisagreeColDisp1 = disagreeColDisp1;
  const postsortDisagreeColDisp2 = disagreeColDisp2;
  const showSecondNegColumn = configObj.showSecondNegColumn;

  const agreeObj = {};
  agreeObj.agreeText = agree;
  agreeObj.columnDisplay = [postsortAgreeColDisp1];
  agreeObj.columnDisplay2 = [postsortAgreeColDisp2];
  agreeObj.displaySecondColumn = showSecondPosColumn;
  agreeObj.placeholder = placeholder;

  /*  const neutralObj = {};
  neutralObj.neutralText = neutral;
  neutralObj.displayNeutralObjects = configObj.displayNeutralObjects;
  neutralObj.columnDisplay = ["column0"];
  neutralObj.placeholder = placeholder;
 */
  const disagreeObj = {};
  disagreeObj.disagreeText = disagree;
  disagreeObj.columnDisplay = [postsortDisagreeColDisp1];
  disagreeObj.columnDisplay2 = [postsortDisagreeColDisp2];
  disagreeObj.displaySecondColumn = showSecondNegColumn;
  disagreeObj.placeholder = placeholder;

  const highCards = columnStatements?.vCols[agreeObj.columnDisplay];
  const highCards2 = columnStatements?.vCols[agreeObj.columnDisplay2];
  // const neutralCards = columnStatements.vCols[neutralObj.columnDisplay];
  const lowCards = columnStatements?.vCols[disagreeObj.columnDisplay];
  const lowCards2 = columnStatements?.vCols[disagreeObj.columnDisplay2];

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
          width={columnWidth}
          highCards={highCards}
        />

        {agreeObj.displaySecondColumn && (
          <HighCards2
            agreeObj={agreeObj}
            height={cardHeight}
            cardFontSize={cardFontSize}
            width={columnWidth}
            highCards2={highCards2}
          />
        )}

        {/*  {neutralObj.displayNeutralObjects && (
          <NeutralCards
            neutralObj={neutralObj}
            height={cardHeight}
            width={columnWidth}
            cardFontSize={cardFontSize}
            neutralCards={neutralCards}
          />
        )} */}

        {disagreeObj.displaySecondColumn && (
          <LowCards2
            disagreeObj={disagreeObj}
            height={cardHeight}
            width={columnWidth}
            lowCards2={lowCards2}
            cardFontSize={cardFontSize}
          />
        )}

        <LowCards
          disagreeObj={disagreeObj}
          height={cardHeight}
          width={columnWidth}
          cardFontSize={cardFontSize}
          lowCards={lowCards}
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
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
  position: fixed;
  top: 0;
`;

const PostsortInstructions = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  margin-top: 30px;
  text-align: center;
  color: black;
  font-size: 2vh;
  font-weight: normal;
  max-width: 1100px;
`;
