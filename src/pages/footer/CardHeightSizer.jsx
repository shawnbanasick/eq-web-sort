import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getCardHeightSort = (state) => state.cardHeightSort;
const getSetCardHeightSort = (state) => state.setCardHeightSort;
const getCardHeightPostsort = (state) => state.cardHeightPostsort;
const getSetCardHeightPostsort = (state) => state.setCardHeightPostsort;
const getCurrentPage = (state) => state.currentPage;

const CardHeightSizer = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);

  let cardHeightSort = useStore(getCardHeightSort);
  const cardHeightPersistSort = localStorage.getItem("cardHeightSort");
  let cardHeightPostsort = useStore(getCardHeightPostsort);
  const cardHeightPersistPostsort = localStorage.getItem("cardHeightPostsort");

  const currentPage = useStore(getCurrentPage);
  const setCardHeightSort = useStore(getSetCardHeightSort);
  const setCardHeightPostsort = useStore(getSetCardHeightPostsort);

  if (cardHeightPersistSort) {
    cardHeightSort = cardHeightPersistSort;
  }

  if (cardHeightPersistPostsort) {
    cardHeightPostsort = cardHeightPersistPostsort;
  }

  const cardHeightText =
    ReactHtmlParser(decodeHTML(langObj.cardHeightText)) || "";

  const increaseHeight = () => {
    if (currentPage === "sort") {
      const currentSize = +cardHeightSort;
      const newSize = currentSize + 2;
      localStorage.setItem("cardHeightSort", JSON.stringify(newSize));
      setCardHeightSort(newSize);
    }
    if (currentPage === "postsort") {
      const currentSize = +cardHeightPostsort;
      const newSize = currentSize + 2;
      localStorage.setItem("cardHeightPostsort", JSON.stringify(newSize));
      setCardHeightPostsort(newSize);
    }
  };
  const decreaseHeight = () => {
    if (currentPage === "sort") {
      const currentSize = +cardHeightSort;
      const newSize = currentSize - 2;
      localStorage.setItem("cardHeightSort", JSON.stringify(newSize));
      setCardHeightSort(newSize);
    }
    if (currentPage === "postsort") {
      const currentSize = +cardHeightPostsort;
      const newSize = currentSize - 2;
      localStorage.setItem("cardHeightPostsort", JSON.stringify(newSize));
      setCardHeightPostsort(newSize);
    }
  };

  return (
    <Container>
      <SpanDiv>{cardHeightText}</SpanDiv>
      <SizeButton padBottom={"0.4em"} onClick={decreaseHeight}>
        -
      </SizeButton>
      <SizeButton padBottom={"0.25em"} onClick={increaseHeight}>
        +
      </SizeButton>
    </Container>
  );
};

export default CardHeightSizer;

const SizeButton = styled.button`
  background: #337ab7;
  border-color: #2e6da4;
  color: white;
  font-size: 1.4em;
  font-weight: bold;
  margin: 0 3px 0 3px;
  padding: 0.25em 0.5em;
  padding-bottom: ${(props) => props.padBottom};
  height: 30px;
  width: 35px;
  border-radius: 3px;
  text-decoration: none;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 15px;
`;

const SpanDiv = styled.div`
  font-size: 16px;
`;
