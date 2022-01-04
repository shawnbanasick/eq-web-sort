import React from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import sanitizeString from "../../utilities/sanitizeString";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

/* eslint react/prop-types: 0 */

// LowCards example ===> {high: ["column4"], middle: ["column0"], low: ["columnN4"]}

const NeutralCards = (props) => {
  // STATE
  const configObj = useSettingsStore((state) => state.configObj);
  const columnStatements = useSettingsStore((state) => state.columnStatements);
  const results = useStore((state) => state.resultsPostsort);
  const setResultsPostsort = useStore((state) => state.setResultsPostsort);
  const statementCommentsObj = useStore((state) => state.statementCommentsObj);

  const postsortConvertObj = configObj.postsortConvertObj;

  // on blur, get text and add comment to card object
  const onBlur = (event, columnDisplay, itemId) => {
    const cards = columnStatements.vCols[columnDisplay];
    const targetCard = event.target.id;
    const userEnteredText = event.target.value;
    const identifier = `${columnDisplay}_${itemId + 1}`;

    // pull in state object for comments

    // to update just the card that changed
    cards.map((el) => {
      if (el.id === targetCard) {
        const comment3 = userEnteredText;
        // remove new line and commas to make csv export easier
        const comment2 = comment3.replace(/\n/g, " ");
        const comment = comment2.replace(/,/g, " ");
        // assign to main data object for confirmation / debugging
        el.comment = sanitizeString(comment);

        // assign to comments object
        statementCommentsObj[identifier] = `(${el.id}) ${comment}`;
        results[identifier] = `(${el.id}) ${comment}`;
      }
      return el;
    });

    setResultsPostsort(results);
    // setGlobalState("statementCommentsObj", statementCommentsObj);
    // setGlobalState("columnStatements", columnStatements);
  }; // end onBlur

  const { height, width, cardFontSize, neutralObj, neutralCards } = props;
  const { neutralText, placeholder } = neutralObj;

  const columnDisplay = neutralObj.columnDisplay;

  const columnInfo = ` Column ${postsortConvertObj[columnDisplay]}`;

  return neutralCards.map((item, index) => {
    const statementHtml = ReactHtmlParser(decodeHTML(item.statement));
    return (
      <Container key={item.statement}>
        <CardTag cardFontSize={cardFontSize}>
          {neutralText}
          {columnInfo}
        </CardTag>
        <CardAndTextHolder>
          <Card cardFontSize={cardFontSize} width={width} height={height}>
            {statementHtml}
          </Card>
          <TagContainerDiv>
            <CommentArea
              data-gramm_editor="false"
              id={item.id}
              height={height}
              cardFontSize={cardFontSize}
              className="commentTextArea"
              placeholder={placeholder}
              defaultValue={item.comment}
              onBlur={(e) => {
                onBlur(e, columnDisplay, index);
              }}
            />
          </TagContainerDiv>
        </CardAndTextHolder>
      </Container>
    );
  });
};

export default view(NeutralCards);

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
  margin-top: 50px;
  border-radius: 3px;
  border: 1px solid darkgray;
`;

const CardTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #c5c5c5;
  color: black;
  text-align: center;
  font-size: ${(props) => `${props.cardFontSize}px`};
  height: 1.5em;
`;

const CardAndTextHolder = styled.div`
  display: flex;
  align-content: center;
  background: rgb(224, 224, 224);
  width: 90vw;
  max-width: 898px;
`;

const CommentArea = styled.textarea`
  padding: 10px;
  background-color: white;
  height: ${(props) => `${props.height}px;`};
  font-size: ${(props) => `${props.cardFontSize}px`};
  width: calc(100% - 6px);
  border: 2px solid darkgray;
  border-radius: 3px;
`;

const TagContainerDiv = styled.div`
  padding-top: 3px;
  width: 100%;
`;

const Card = styled.div`
  user-select: "none";
  padding: 0 2px 0 2px;
  margin: 5px 5px 5px 5px;
  line-height: 1em;
  height: ${(props) => `${props.height}px;`};
  width: 20vw;
  max-width: ${(props) => `${props.width}px;`};
  border-radius: 5px;
  font-size: ${(props) => `${props.cardFontSize}px`};
  display: flex;
  align-items: center;
  border: 2px solid black;
  background-color: #f6f6f6;
  text-align: center;
`;
