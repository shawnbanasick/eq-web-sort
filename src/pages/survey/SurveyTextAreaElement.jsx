import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import sanitizeString from "../../utilities/sanitizeString.js";
import useStore from "../../globalState/useStore.js";

const getResults = (state) => state.resultsSurvey;
const getSetResultsSurvey = (state) => state.setResultsSurvey;
const getCheckReqQsComplete = (state) => state.checkRequiredQuestionsComplete;
const getRequiredAnswersObj = (state) => state.requiredAnswersObj;
const getSetRequiredAnswersObj = (state) => state.setRequiredAnswersObj;
const getAnswersStorage = (state) => state.answersStorage;
const getSetAnswersStorage = (state) => state.setAnswersStorage;

const SurveyTextAreaElement = (props) => {
  // STATE
  const results = useStore(getResults);
  const setResultsSurvey = useStore(getSetResultsSurvey);
  const checkRequiredQuestionsComplete = useStore(getCheckReqQsComplete);
  const requiredAnswersObj = useStore(getRequiredAnswersObj);
  const setRequiredAnswersObj = useStore(getSetRequiredAnswersObj);
  const answersStorage = useStore(getAnswersStorage);
  const setAnswersStorage = useStore(getSetAnswersStorage);

  useEffect(() => {
    results[`qNum${props.opts.qNum}`] = "no response";
    setResultsSurvey(results);
  }, [props, results, setResultsSurvey]);

  // let savedTextAreaText;
  const [userText, setUserText] = useState("");
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  const id = `qNum${props.opts.qNum}`;

  // ON CHANGE
  const handleOnChange = (e) => {
    let value = e.target.value;
    // value = value.trim();
    setUserText(value);
    answersStorage[id] = value;
    setAnswersStorage(answersStorage);

    // record if answered or not
    if (value.length > 0) {
      requiredAnswersObj[id] = "answered";
      let sanitizedText = sanitizeString(value);
      results[`qNum${props.opts.qNum}`] = sanitizedText;
    } else {
      requiredAnswersObj[id] = "no response";
      results[`qNum${props.opts.qNum}`] = "no response";
    }
    setRequiredAnswersObj(requiredAnswersObj);
    setResultsSurvey(results);
  };

  // required question answer check
  let userTextLen = false;
  if (id in answersStorage) {
    let userTextLen1 = answersStorage[id];
    userTextLen = userTextLen1.length;
  }

  useEffect(() => {
    if (
      (props.opts.required === true || props.opts.required === "true") &&
      checkRequiredQuestionsComplete === true &&
      userTextLen < 1
    ) {
      setFormatOptions({
        bgColor: "lightpink",
        border: "3px dashed black",
      });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [
    checkRequiredQuestionsComplete,
    userText,
    userTextLen,
    props.opts.required,
  ]);

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));
  const placeholder = props.opts.placeholder;

  // to check for response in global state and inject into results if present
  let inputValue;
  if (id in answersStorage) {
    inputValue = answersStorage[id];

    // record if answered or not
    requiredAnswersObj[id] = "answered";
    results[`qNum${props.opts.qNum}`] = inputValue;

    setRequiredAnswersObj(requiredAnswersObj);
    setResultsSurvey(results);
  } else {
    inputValue = "";
  }

  return (
    <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
      <TitleBar>
        <div>{labelText}</div>
      </TitleBar>
      <TextAreaInput
        value={inputValue}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </Container>
  );
};

export default SurveyTextAreaElement;

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 200px;
  background-color: whitesmoke;
  background-color: ${(props) => props.bgColor};
  outline: ${(props) => props.border};
  outline-offset: -3px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 5px;
  font-size: 18px;
  text-align: center;
  background-color: lightgray;
  width: 100%;
  border-radius: 3px;
`;

const TextAreaInput = styled.textarea`
  display: flex;
  justify-content: left;
  align-items: center;
  vertical-align: center;
  margin-top: 0px;
  height: 150px;
  font-size: 18px;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  border: 2px solid lightgray;
  padding: 5px;
`;
