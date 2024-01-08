import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getCardFontSize = (state) => state.cardFontSize;
const getSetCardFontSize = (state) => state.setCardFontSize;

const FooterFontSizer = () => {
  // GLOBAL STATE
  const langObj = useSettingsStore(getLangObj);
  const cardFontSize = useStore(getCardFontSize);
  const fontSizeText = ReactHtmlParser(decodeHTML(langObj.fontSizeText)) || "";

  const setCardFontSize = useStore(getSetCardFontSize);

  const increaseFontSize = () => {
    const currentSize = cardFontSize;
    const newSize = currentSize + 1;
    setCardFontSize(newSize);
    localStorage.setItem("fontSizeSort", JSON.stringify(newSize));
    localStorage.setItem("fontSizePostsort", JSON.stringify(newSize));
  };
  const decreaseFontSize = () => {
    const currentSize = cardFontSize;
    const newSize = currentSize - 1;
    setCardFontSize(newSize);
    localStorage.setItem("fontSizeSort", JSON.stringify(newSize));
    localStorage.setItem("fontSizePostsort", JSON.stringify(newSize));
  };

  return (
    <Container>
      <SpanDiv>{fontSizeText}</SpanDiv>
      <SizeButton padBottom={"0.4em"} onClick={decreaseFontSize}>
        -
      </SizeButton>
      <SizeButton padBottom={"0.25em"} onClick={increaseFontSize}>
        +
      </SizeButton>
    </Container>
  );
};

export default FooterFontSizer;

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
