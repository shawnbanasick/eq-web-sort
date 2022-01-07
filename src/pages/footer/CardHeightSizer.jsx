import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getCardHeight = (state) => state.cardHeight;
const getSetCardHeight = (state) => state.setCardHeight;

const CardHeightSizer = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const cardHeight = useStore(getCardHeight);
  const setCardHeight = useStore(getSetCardHeight);

  const cardHeightText = ReactHtmlParser(decodeHTML(langObj.cardHeightText));

  const increaseHeight = () => {
    const currentSize = +cardHeight;
    const newSize = currentSize + 2;
    setCardHeight(newSize);
  };
  const decreaseHeight = () => {
    const currentSize = +cardHeight;
    const newSize = currentSize - 2;
    setCardHeight(newSize);
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
