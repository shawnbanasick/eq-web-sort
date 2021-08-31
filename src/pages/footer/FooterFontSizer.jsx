import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

const FooterFontSizer = () => {
  const langObj = getGlobalState("langObj");
  const fontSizeText = ReactHtmlParser(decodeHTML(langObj.fontSizeText));

  const increaseFontSize = () => {
    const currentSize = getGlobalState("cardFontSize");
    const newSize = currentSize + 1;
    setGlobalState("cardFontSize", newSize);
  };
  const decreaseFontSize = () => {
    const currentSize = getGlobalState("cardFontSize");
    const newSize = currentSize - 1;
    setGlobalState("cardFontSize", newSize);
  };

  return (
    <Container>
      <SpanDiv>{fontSizeText}</SpanDiv>
      <SizeButton onClick={decreaseFontSize}>-</SizeButton>
      <SizeButton onClick={increaseFontSize}>+</SizeButton>
    </Container>
  );
};

export default view(FooterFontSizer);

const SizeButton = styled.button`
  background: #337ab7;
  border-color: #2e6da4;
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  margin: 0 3px 0 3px;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
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
`;

const SpanDiv = styled.div`
  font-size: 16px;
`;
