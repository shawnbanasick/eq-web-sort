import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

const increaseFontSize = () => {
  const currentSize1 = getGlobalState("cardFontSize");
  const currentSize = currentSize1.substring(0, 2);
  const newSize1 = parseInt(currentSize, 10);
  const newSize2 = newSize1 + 1;
  const newSize = `${newSize2}px`;
  setGlobalState("cardFontSize", newSize);
};
const decreaseFontSize = () => {
  const currentSize1 = getGlobalState("cardFontSize");
  const currentSize = currentSize1.substring(0, 2);
  const newSize1 = parseInt(currentSize, 10);
  const newSize2 = newSize1 - 1;
  const newSize = `${newSize2}px`;
  setGlobalState("cardFontSize", newSize);
};

const FooterFontSizer = () => {
  return (
    <Container>
      <span>Font Size</span>
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
  font-size: 1em;
  font-weight: bold;
  margin: 0 3px 0 3px;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
