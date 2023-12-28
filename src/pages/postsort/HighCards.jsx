import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import sanitizeString from "../../utilities/sanitizeString";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import { Modal } from "react-responsive-modal";
import useLocalStorage from "../../utilities/useLocalStorage";

/* eslint react/prop-types: 0 */

// format example ===> {high: ["column4"], middle: ["column0"], low: ["columnN4"]}

const getResultsPostsort = (state) => state.resultsPostsort;
const getSetResultsPostsort = (state) => state.setResultsPostsort;
const getStatementCommentsObj = (state) => state.statementCommentsObj;
const getPostsortCommentCheckObj = (state) => state.postsortCommentCheckObj;
const getSetPostsortCommentCheckObj = (state) =>
  state.setPostsortCommentCheckObj;
const getConfigObj = (state) => state.configObj;
const getShowPostsortCommentHighlighting = (state) =>
  state.showPostsortCommentHighlighting;
const getPostsortDualImageArray = (state) => state.postsortDualImageArray;
const getSetPostsortDualImageArray = (state) => state.setPostsortDualImageArray;

const HighCards = (props) => {
  // LOCAL STATE
  // const [commentCheckObj, setCommentCheckObj] = useState({});
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [openDualImageModal, setOpenDualImageModal] = useState(false);

  // PERSISTED STATE
  const columnStatements = JSON.parse(localStorage.getItem("sortColumns"));
  let [allCommentsObj, setAllCommentsObj] = useLocalStorage(
    "allCommentsObj",
    {}
  );
  const requiredCommentsObj =
    JSON.parse(localStorage.getItem("requiredCommentsObj")) || {};

  // GLOBAL STATE
  const resultsPostsort = useStore(getResultsPostsort);
  const setResultsPostsort = useStore(getSetResultsPostsort);
  const statementCommentsObj = useStore(getStatementCommentsObj);
  const postsortCommentCheckObj = useStore(getPostsortCommentCheckObj);
  const setPostsortCommentCheckObj = useStore(getSetPostsortCommentCheckObj);
  const configObj = useSettingsStore(getConfigObj);
  const showPostsortCommentHighlighting = useStore(
    getShowPostsortCommentHighlighting
  );
  const postsortDualImageArray = useStore(getPostsortDualImageArray);
  const setPostsortDualImageArray = useStore(getSetPostsortDualImageArray);

  const { agreeObj, cardFontSize, width, height } = props;
  const highCards = columnStatements.vCols[agreeObj.columnDisplay];
  const { agreeText, placeholder } = agreeObj;
  let columnDisplay = agreeObj.columnDisplay;

  // restore results from localStorage
  useEffect(() => {
    const keys = Object.keys(allCommentsObj);
    // read in comments
    if (keys.length > 0) {
      keys.map((key) => {
        const identifier = key;
        const comment = allCommentsObj[key];
        resultsPostsort[identifier] = comment;
        return key;
      });
    }
  });

  // transfer state from global to local (for highlighting)
  /*
  useEffect(() => {
    setCommentCheckObj(postsortCommentCheckObj);
  }, [setCommentCheckObj, postsortCommentCheckObj]);
*/

  // on double click of card, enlarge image
  const handleOpenImageModal = (e, src) => {
    if (e.detail === 2) {
      if (e.shiftKey) {
        postsortDualImageArray.push(e.target.src);
        setPostsortDualImageArray(postsortDualImageArray);
        if (postsortDualImageArray.length === 2) {
          setOpenDualImageModal(true);
        }
      } else {
        setImageSource(e.target.src);
        setOpenImageModal(true);
      }
    }
  };

  // on leaving card comment section
  const handleChange = (event, itemId) => {
    // set comment check object for Results formatting on Submit page
    let commentLength = event.target.value.length;
    if (commentLength > 0) {
      postsortCommentCheckObj[`hc-${itemId}`] = true;
      setPostsortCommentCheckObj(postsortCommentCheckObj);
      // setCommentCheckObj({ ...postsortCommentCheckObj });
    } else {
      postsortCommentCheckObj[`hc-${itemId}`] = false;
      setPostsortCommentCheckObj(postsortCommentCheckObj);
      // setCommentCheckObj({ ...postsortCommentCheckObj });
    }
    const results = resultsPostsort;
    const cards = columnStatements.vCols[columnDisplay];
    const targetCard = event.target.id;
    const userEnteredText = event.target.value;
    const identifier = `${columnDisplay}_${+itemId + 1}`;

    // to update RESULTS storage for just the card that changed
    // results format  ===> { column3_1: "(image3) yes I think so" }
    cards.map((el) => {
      if (el.id === targetCard) {
        const comment3 = userEnteredText;
        // remove new line and commas to make csv export easier
        const comment2 = comment3.replace(/\n/g, " ");
        let comment = comment2.replace(/,/g, " ");
        // assign to main data object for confirmation / debugging
        el.comment = sanitizeString(comment);
        // assign to comments object
        statementCommentsObj[identifier] = `(${el.id}) ${comment}`;
        results[identifier] = `(${el.id}) ${comment}`;
        // setup persistence for comments
        allCommentsObj[identifier] = `(${el.id}) ${comment}`;
        allCommentsObj[
          `textArea-${columnDisplay}_${itemId + 1}`
        ] = `${comment}`;
        setAllCommentsObj({ ...allCommentsObj });
      }
      return el;
    });
    setResultsPostsort(results);
    localStorage.setItem("resultsPostsort", JSON.stringify(results));
  }; // END handleChange

  // MAP cards to DOM
  return highCards.map((item, index) => {
    let content = ReactHtmlParser(`<div>${decodeHTML(item.statement)}</div>`);
    let cardComment =
      allCommentsObj[`textArea-${columnDisplay}_${+index + 1}`] || "";

    if (cardComment.length > 0) {
      requiredCommentsObj[`hc-${index}`] = true;
    } else {
      requiredCommentsObj[`hc-${index}`] = false;
    }

    localStorage.setItem(
      "requiredCommentsObj",
      JSON.stringify(requiredCommentsObj)
    );

    if (configObj.useImages === true) {
      content = ReactHtmlParser(
        `<img src="${item.element.props.src}" style="pointer-events: all" alt=${item.element.props.alt} />`
      );
    }

    let highlighting = true;
    if (
      configObj.postsortCommentsRequired === "true" ||
      configObj.postsortCommentsRequired === true
    ) {
      // if comments are required, highlight if no comment
      if (showPostsortCommentHighlighting === true) {
        highlighting = requiredCommentsObj[`hc-${index}`];
      }
    }

    return (
      <Container id="postSortImageModal" key={item.statement}>
        <Modal
          open={openImageModal}
          center
          onClose={() => setOpenImageModal(false)}
          classNames={{
            modal: `${configObj.imageType}`,
            overlay: "dualImageOverlay",
          }}
        >
          <img src={imageSource} width="100%" height="auto" alt="modalImage" />
        </Modal>
        <Modal
          open={openDualImageModal}
          center
          onClose={() => {
            setOpenDualImageModal(false);
            setPostsortDualImageArray([]);
          }}
          classNames={{ overlay: "dualImageOverlay", modal: "dualImageModal" }}
        >
          <img
            src={postsortDualImageArray[0]}
            width="49.5%"
            height="auto"
            alt="modalImage"
          />
          <img
            src={postsortDualImageArray[1]}
            width="49.5%"
            height="auto"
            style={{ marginLeft: "1%" }}
            alt="modalImage2"
          />
        </Modal>
        <CardTag cardFontSize={cardFontSize}>{agreeText}</CardTag>
        <CardAndTextHolder>
          <Card
            cardFontSize={cardFontSize}
            width={width}
            height={height}
            cardColor={item.cardColor}
            onClick={(e) => handleOpenImageModal(e, item.element.props.src)}
          >
            {content}
          </Card>
          <TagContainerDiv>
            <CommentArea
              bgColor={highlighting}
              border={highlighting}
              data-gramm_editor="false"
              cardFontSize={cardFontSize}
              height={height}
              id={item.id}
              useImages={configObj.useImages}
              placeholder={placeholder}
              defaultValue={cardComment}
              onChange={(e) => {
                handleChange(e, index);
              }}
            />
          </TagContainerDiv>
        </CardAndTextHolder>
      </Container>
    );
  });
};

export default HighCards;

const Container = styled.div`
  width: 90vw;
  max-width: 1100px;
  margin-top: 50px;
  border-radius: 3px;
  border: 1px solid darkgray;
`;

const CardTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #c7f6c7;
  font-size: ${(props) => `${props.cardFontSize}px`};
  color: black;
  text-align: center;
  height: 1.5em;
`;

const CardAndTextHolder = styled.div`
  display: flex;
  align-content: center;
  background: rgb(224, 224, 224);
  width: 100%;
`;

const CommentArea = styled.textarea`
  padding: 10px;
  margin-top: 2px;
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
  width: 35vw;
  //max-width: ${(props) => (props.useImages ? `none` : `${props.width}px;`)};
  border-radius: 5px;
  font-size: ${(props) => `${props.cardFontSize}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid darkslategray;
  background-color: #f6f6f6;
  text-align: center;

  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }
`;
