import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import setGlobalState from "../../globalState/setGlobalState";

const increaseFontSize = () => {
  const currentSize = +JSON.parse(localStorage.getItem("cardHeight")) || 100;
  const newSize = currentSize + 2;
  setGlobalState("cardHeight", newSize);

  localStorage.setItem("cardHeight", JSON.stringify(newSize));
};
const decreaseFontSize = () => {
  const currentSize = +JSON.parse(localStorage.getItem("cardHeight")) || 100;
  const newSize = currentSize - 2;
  setGlobalState("cardHeight", newSize);
  console.log(newSize);
  localStorage.setItem("cardHeight", JSON.stringify(newSize));
};

const langObj = JSON.parse(localStorage.getItem("langObj"));

const CardHeightSizer = () => {
  return (
    <Container>
      <SpanDiv>{langObj.cardHeight}</SpanDiv>
      <SizeButton onClick={decreaseFontSize}>-</SizeButton>
      <SizeButton onClick={increaseFontSize}>+</SizeButton>
    </Container>
  );
};

export default view(CardHeightSizer);

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
  margin-left: 15px;
`;

const SpanDiv = styled.div`
  font-size: 16px;
`;
