import React from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";

const SurveyTextElement = () => {
  return (
    <Container>
      <TitleBar>Age*</TitleBar>
    </Container>
  );
};

export default view(SurveyTextElement);

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 900px;
  background-color: whitesmoke;
  min-height: 200px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 22px;
  text-align: center;
  background-color: lightgray;
  width: 100%;
  border-radius: 3px;
`;
