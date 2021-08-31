import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

const SurveyTextElement = (props) => {
  useEffect(() => {
    const results = getGlobalState("resultsSurvey");
    results[`qNum${props.opts.qNum}`] = "no response";
    setGlobalState("resultsSurvey", results);
  }, [props]);

  const id = `qNum${props.opts.qNum}`;
  const [userText, setUserText] = useState("");

  // required question answer check
  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );

  let bgColor;
  let border;

  const handleOnChange = (e) => {
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");
    const results = getGlobalState("resultsSurvey");

    let value = e.target.value;
    let valueLen = value.length;

    if (props.opts.restricted === "true") {
      if (value.length > +props.opts.limitLength) {
        value = value.substring(0, props.opts.limitLength);
      }
    }
    setUserText(value);

    // record if answered or not
    if (valueLen > 0) {
      requiredAnswersObj[id] = "answered";
      results[`qNum${props.opts.qNum}`] = value;
    } else {
      results[`qNum${props.opts.qNum}`] = "no response";
      requiredAnswersObj[id] = "no response";
    }
    setGlobalState("requiredAnswersObj", requiredAnswersObj);
    setGlobalState("resultsSurvey", results);
  };

  // required question answer check
  let userTextLen = 0;
  if (userText) {
    userTextLen = userText.length;
  }

  if (
    checkRequiredQuestionsComplete === true &&
    userTextLen < 1 &&
    props.opts.required === true
  ) {
    bgColor = "lightpink";
    border = "3px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  return (
    <Container bgColor={bgColor} border={border}>
      <TitleBar>{props.opts.label}</TitleBar>
      <NoteText>{props.opts.note}</NoteText>
      <TextInput value={userText || ""} onChange={handleOnChange} />
    </Container>
  );
};

export default view(SurveyTextElement);

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 200px;
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.border};
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 18px;
  text-align: center;
  width: 100%;
  border-radius: 3px;
  background-color: lightgray;
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
  padding-left: 5px;
  padding-right: 5px;
`;
