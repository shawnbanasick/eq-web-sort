import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import sanitizeString from "../../utilities/sanitizeString";
import useStore from "../../globalState/useStore";
import useLocalStorage from "../../utilities/useLocalStorage";

const getResults = (state) => state.resultsSurvey;
const getSetResultsSurvey = (state) => state.setResultsSurvey;
// const getAnswersStorage = (state) => state.answersStorage;
// const getSetAnswersStorage = (state) => state.setAnswersStorage;

const SurveyTextElement = (props) => {
  // GLOBAL STATE
  const results = useStore(getResults);
  const setResultsSurvey = useStore(getSetResultsSurvey);
  //const answersStorage = useStore(getAnswersStorage);
  //const setAnswersStorage = useStore(getSetAnswersStorage);
  const requiredAnswersObj = useStore((state) => state.requiredAnswersObj);
  const setRequiredAnswersObj = useStore(
    (state) => state.setRequiredAnswersObj
  );

  // PERSISTENT STATE
  const answersStorage =
    JSON.parse(localStorage.getItem("answersStorage")) || {};
  let questionId = props.opts.id;
  const [userText, setUserText] = useLocalStorage(questionId, "");

  // LOCAL STATE
  // for required question check
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  // FROM PROPS
  const checkRequiredQuestionsComplete = props.check;

  // preload "no response" in state
  useEffect(() => {
    results[`qNum${props.opts.qNum}`] = "no response";
    setResultsSurvey(results);
  }, [props, setResultsSurvey, results]);
  const id = `qNum${props.opts.qNum}`;

  // event handler
  const handleOnChange = (e) => {
    let value = e.target.value;
    let valueLen = value.length;
    console.log(value, valueLen);
    // restrict to numbers (from config.xml)
    if (props.opts.restricted === "true" || props.opts.restricted === true) {
      value = value.replace(/\D/g, "");
    }
    // limit length (from config.xml)
    if (props.opts.limited === "true" || props.opts.limited === true) {
      if (value.length > +props.opts.limitLength) {
        value = value.substring(0, +props.opts.limitLength);
      }
    }
    answersStorage[questionId] = value;
    localStorage.setItem("answersStorage", JSON.stringify(answersStorage));
    setUserText(value);
    // record if answered or not
    if (valueLen > 0) {
      requiredAnswersObj[id] = "answered";
      let sanitizedText = sanitizeString(value);
      results[`qNum${props.opts.qNum}`] = sanitizedText;
    } else {
      results[`qNum${props.opts.qNum}`] = "no response";
      requiredAnswersObj[id] = "no response";
    }
    setRequiredAnswersObj(requiredAnswersObj);
    setResultsSurvey(results);
  }; // End event handler

  console.log(JSON.stringify(answersStorage));

  // required question answer check
  let userTextLen = false;
  if (userText.length > 0) {
    userTextLen = true;
  }

  useEffect(() => {
    if (
      checkRequiredQuestionsComplete === true &&
      userTextLen < 1 &&
      props.opts.required === true
    ) {
      setFormatOptions({
        bgColor: "#fde047",
        border: "3px dashed black",
      });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, userTextLen, props]);

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));
  const noteText = ReactHtmlParser(decodeHTML(props.opts.note));

  let inputValue;
  console.log(answersStorage);

  if (id in answersStorage) {
    inputValue = answersStorage[id];
    console.log(inputValue);
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
      <NoteText>
        <div>{noteText}</div>
      </NoteText>
      <TextInput value={userText} onChange={handleOnChange} />
    </Container>
  );
};

export default SurveyTextElement;

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 200px;
  background-color: ${(props) => props.bgColor};
  outline: ${(props) => props.border};
  outline-offset: -3px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  min-height: 50px;
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
