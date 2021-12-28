import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import setGlobalState from "../../globalState/setGlobalState";
import getGlobalState from "../../globalState/getGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";

const CardHeightSizer = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const cardHeightText = ReactHtmlParser(decodeHTML(langObj.cardHeightText));

  const increaseFontSize = () => {
    const currentSize = +getGlobalState("cardHeight");
    const newSize = currentSize + 2;
    setGlobalState("cardHeight", newSize);
  };
  const decreaseFontSize = () => {
    const currentSize = +getGlobalState("cardHeight");
    const newSize = currentSize - 2;
    setGlobalState("cardHeight", newSize);
  };

  return (
    <Container>
      <SpanDiv>{cardHeightText}</SpanDiv>
      <SizeButton padBottom={"0.4em"} onClick={decreaseFontSize}>
        -
      </SizeButton>
      <SizeButton padBottom={"0.25em"} onClick={increaseFontSize}>
        +
      </SizeButton>
    </Container>
  );
};

export default view(CardHeightSizer);

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
