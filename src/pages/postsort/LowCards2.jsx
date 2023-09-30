import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import sanitizeString from "../../utilities/sanitizeString";
import useStore from "../../globalState/useStore";
import useSettingsStore from "../../globalState/useSettingsStore";

/* eslint react/prop-types: 0 */

// LowCards example ===> {high: ["column4"], middle: ["column0"], low: ["columnN4"]}

const getColumnStatements = (state) => state.columnStatements;
const getResultsPostsort = (state) => state.resultsPostsort;
const getSetResultsPostsort = (state) => state.setResultsPostsort;
const getStatementCommentsObj = (state) => state.statementCommentsObj;
const getPostsortCommentCheckObj = (state) => state.postsortCommentCheckObj;
const getSetPostsortCommentCheckObj = (state) =>
  state.setPostsortCommentCheckObj;
const getConfigObj = (state) => state.configObj;
const getShowPostsortCommentHighlighting = (state) =>
  state.showPostsortCommentHighlighting;

const LowCards2 = (props) => {
  const [commentCheckObj, setCommentCheckObj] = useState({});

  //STATE
  const columnStatements = useSettingsStore(getColumnStatements);
  const resultsPostsort = useStore(getResultsPostsort);
  const setResultsPostsort = useStore(getSetResultsPostsort);
  const statementCommentsObj = useStore(getStatementCommentsObj);
  const postsortCommentCheckObj = useStore(getPostsortCommentCheckObj);
  const setPostsortCommentCheckObj = useStore(getSetPostsortCommentCheckObj);
  const configObj = useSettingsStore(getConfigObj);
  const showPostsortCommentHighlighting = useStore(
    getShowPostsortCommentHighlighting
  );

  useEffect(() => {
    setCommentCheckObj(postsortCommentCheckObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCommentCheckObj]);

  // on blur, get text and add comment to card object
  const onChange = (event, columnDisplay, itemId) => {
    let commentLength = event.target.value.length;
    if (commentLength > 0) {
      postsortCommentCheckObj[`lc2-${itemId}`] = true;
      setPostsortCommentCheckObj(postsortCommentCheckObj);
      setCommentCheckObj({ ...postsortCommentCheckObj });
    } else {
      postsortCommentCheckObj[`lc2-${itemId}`] = false;
      setPostsortCommentCheckObj(postsortCommentCheckObj);
      setCommentCheckObj({ ...postsortCommentCheckObj });
    }
    const results = resultsPostsort;
    const cards = [...columnStatements.vCols[columnDisplay]];
    const targetCard = event.target.id;
    const userEnteredText = event.target.value;

    const identifier = `${columnDisplay}_${itemId + 1}`;

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
  }; // end onBlur

  const { height, width, cardFontSize, lowCards2, disagreeObj } = props;
  const { disagreeText, placeholder } = disagreeObj;

  const columnDisplay = disagreeObj.columnDisplay2;

  return lowCards2.map((item, index) => {
    const statementHtml = ReactHtmlParser(
      `<div>${decodeHTML(item.statement)}</div>`
    );
    item.indexVal = index;
    let highlighting = true;
    if (
      configObj.postsortAnswersRequired === "true" ||
      configObj.postsortAnswersRequired === true
    ) {
      if (showPostsortCommentHighlighting === true) {
        highlighting = commentCheckObj[`lc2-${index}`];
      }
    }
    return (
      <Container key={item.statement}>
        <CardTag cardFontSize={cardFontSize}>{disagreeText}</CardTag>
        <CardAndTextHolder>
          <Card cardFontSize={cardFontSize} width={width} height={height}>
            {statementHtml}
          </Card>
          <TagContainerDiv>
            <CommentArea
              bgColor={highlighting}
              border={highlighting}
              data-gramm_editor="false"
              id={item.id}
              height={height}
              cardFontSize={cardFontSize}
              className="commentTextArea"
              placeholder={placeholder}
              defaultValue={item.comment}
              onChange={(e) => {
                onChange(e, columnDisplay, index);
              }}
            />
          </TagContainerDiv>
        </CardAndTextHolder>
      </Container>
    );
  });
};

export default LowCards2;

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
  background: lightpink;
  font-size: ${(props) => `${props.cardFontSize}px`};
  color: black;
  text-align: center;
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
  background-color: ${(props) => (props.bgColor ? "whitesmoke" : "#fde047")};
  height: ${(props) => `${props.height}px;`};
  font-size: ${(props) => `${props.cardFontSize}px`};
  width: calc(100% - 6px);
  border: 2px solid darkgray;
  border-radius: 3px;
  outline: ${(props) => (props.border ? "none" : "dashed 3px black")};
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
  justify-content: center;
  border: 2px solid black;
  background-color: #f6f6f6;
  text-align: center;
`;
