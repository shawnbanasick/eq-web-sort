import React, { useState } from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";

const SurveyTextElement = (props) => {
  const [number, setNumber] = useState();

  const handleOnChange = (e) => {
    let value = e.target.value;
    if (props.opts.limitLength === true) {
      if (value.length > props.opts.maxLen) {
        value = value.substring(0, props.opts.maxLen);
      }
    }
    setNumber(value);

    console.log(`qNum${props.opts.qNum}-${props.opts.type}`, value);
  };
  return (
    <Container>
      <TitleBar>{props.opts.label}</TitleBar>
      <NoteText>{props.opts.note}</NoteText>
      <TextInput value={number} onChange={handleOnChange} />
    </Container>
  );
};

export default view(SurveyTextElement);

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1100px;
  background-color: whitesmoke;
  min-height: 200px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 18px;
  text-align: center;
  background-color: lightgray;
  width: 100%;
  border-radius: 3px;
`;

const NoteText = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  vertical-align: center;
  margin-top: 5px;
  height: 50px;
  font-size: 16px;
  text-align: center;
  background-color: whitesmoke;
  width: 100%;
  border-radius: 3px;
`;

const TextInput = styled.input`
  display: flex;
  justify-content: left;
  align-items: center;
  vertical-align: center;
  margin-top: 5px;
  height: 50px;
  font-size: 18px;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  border: 2px solid lightgray;
`;
