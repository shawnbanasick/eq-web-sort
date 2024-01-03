import React, { useState } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import sanitizeString from "../../utilities/sanitizeString";
import useStore from "../../globalState/useStore";
import useSettingsStore from "../../globalState/useSettingsStore";
import { Modal } from "react-responsive-modal";
import useLocalStorage from "../../utilities/useLocalStorage";

/* eslint react/prop-types: 0 */

// format example ===> {high: ["column4"], middle: ["column0"], low: ["columnN4"]}

const getPostsortCommentCheckObj = (state) => state.postsortCommentCheckObj;
const getSetPostsortCommentCheckObj = (state) =>
  state.setPostsortCommentCheckObj;
const getConfigObj = (state) => state.configObj;
const getShowPostsortCommentHighlighting = (state) =>
  state.showPostsortCommentHighlighting;
const getPostsortDualImageArray = (state) => state.postsortDualImageArray;
const getSetPostsortDualImageArray = (state) => state.setPostsortDualImageArray;

const LowCards2 = (props) => {
  // HELPER FUNCTION
  const asyncLocalStorage = {
    async setItem(key, value) {
      await null;
      return localStorage.setItem(key, value);
    },
  };

  // LOCAL STATE
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [openDualImageModal, setOpenDualImageModal] = useState(false);

  // PERSISTED STATE
  const columnStatements = JSON.parse(localStorage.getItem("sortColumns"));
  const [requiredCommentsObject, setRequiredCommentsObject] = useLocalStorage(
    "LC2-requiredCommentsObj",
    {}
  );

  // GLOBAL STATE
  const postsortCommentCheckObj = useStore(getPostsortCommentCheckObj);
  const setPostsortCommentCheckObj = useStore(getSetPostsortCommentCheckObj);
  const configObj = useSettingsStore(getConfigObj);
  const showPostsortCommentHighlighting = useStore(
    getShowPostsortCommentHighlighting
  );
  const postsortDualImageArray = useStore(getPostsortDualImageArray);
  const setPostsortDualImageArray = useStore(getSetPostsortDualImageArray);

  const { height, width, cardFontSize, disagreeObj } = props;
  const lowCards2 = columnStatements.vCols[disagreeObj.columnDisplay2];
  const { disagreeText, placeholder } = disagreeObj;
  const columnDisplay = disagreeObj.columnDisplay2;

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

  // on blur, get text and add comment to card object
  const onChange = (event, itemId) => {
    const results = JSON.parse(localStorage.getItem("resultsPostsort")) || {};
    let allCommentsObj =
      JSON.parse(localStorage.getItem("allCommentsObj")) || {};

    // set comment check object for Results formatting on Submit page
    let commentLength = event.target.value.length;
    if (commentLength > 0) {
      postsortCommentCheckObj[`lc2-${itemId}`] = true;
      setPostsortCommentCheckObj(postsortCommentCheckObj);
    } else {
      postsortCommentCheckObj[`lc2-${itemId}`] = false;
      setPostsortCommentCheckObj(postsortCommentCheckObj);
    }
    const cards = [...columnStatements.vCols[disagreeObj.columnDisplay2]];
    const targetCard = event.target.id;
    const userEnteredText = event.target.value;
    const identifier = `${columnDisplay}_${itemId}`;

    // to update just the card that changed
    cards.map((el) => {
      if (el.id === targetCard) {
        const comment3 = userEnteredText;
        // remove new line and commas to make csv export easier
        const comment2 = comment3.replace(/\n/g, " ");
        const comment = comment2.replace(/,/g, " ").trim();
        // assign to main data object for confirmation / debugging
        if (comment.length > 0) {
          el.comment = sanitizeString(comment);

          results[identifier] = `(${el.id}) ${comment}`;
          // setup persistence for comments
          allCommentsObj[identifier] = `(${el.id}) ${comment}`;
          allCommentsObj[
            `textArea-${columnDisplay}_${itemId + 1}`
          ] = `${comment}`;
          setRequiredCommentsObject((requiredCommentsObject) => {
            return { ...requiredCommentsObject, [`lc2-${itemId}`]: true };
          });
        } else {
          el.comment = "";
          results[identifier] = "";
          allCommentsObj[identifier] = "";
          allCommentsObj[`textArea-${columnDisplay}_${itemId + 1}`] = "";
          setRequiredCommentsObject((requiredCommentsObject) => {
            return { ...requiredCommentsObject, [`lc2-${itemId}`]: false };
          });
        }
      }
      return el;
    });
    asyncLocalStorage.setItem("allCommentsObj", JSON.stringify(allCommentsObj));
    asyncLocalStorage.setItem("resultsPostsort", JSON.stringify(results));
  }; // end onBlur

  // MAP cards to DOM
  return lowCards2.map((item, index) => {
    let content = ReactHtmlParser(`<div>${decodeHTML(item.statement)}</div>`);
    let allCommentsObj =
      JSON.parse(localStorage.getItem("allCommentsObj")) || {};
    let cardComment =
      allCommentsObj[`textArea-${columnDisplay}_${+index + 1}`] || "";

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
      if (showPostsortCommentHighlighting === true) {
        highlighting = requiredCommentsObject[`lc2-${index}`];
      }
    }
    return (
      <Container key={item.statement}>
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
        <CardTag cardFontSize={cardFontSize}>{disagreeText}</CardTag>
        <CardAndTextHolder>
          <Card
            cardFontSize={cardFontSize}
            width={width}
            height={height}
            onClick={(e) => handleOpenImageModal(e, item.element.props.src)}
          >
            {content}
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
              defaultValue={cardComment}
              onChange={(e) => {
                onChange(e, index);
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
  width: 100%;
`;

const CommentArea = styled.textarea`
  padding: 10px;
  background-color: ${(props) =>
    props.bgColor ? "whitesmoke" : "rgba(253, 224, 71, .5)"};
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
  border-radius: 5px;
  font-size: ${(props) => `${props.cardFontSize}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  background-color: #f6f6f6;
  text-align: center;

  img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }
`;
