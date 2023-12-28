import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import sanitizeString from "../../utilities/sanitizeString.js";
import useLocalStorage from "../../utilities/useLocalStorage.js";

const SurveyTextAreaElement = (props) => {
  // HELPER FUNCTION
  const asyncLocalStorage = {
    async setItem(key, value) {
      await null;
      return localStorage.setItem(key, value);
    },
  };

  // FROM PROPS
  const id = `qNum${props.opts.qNum}`;
  const checkRequiredQuestionsComplete = props.check;

  // PERSISTENT STATE
  const [userText, setUserText] = useLocalStorage(id, "");

  // set default
  useEffect(() => {
    const resultsSurvey =
      JSON.parse(localStorage.getItem("resultsSurvey")) || {};
    if (
      resultsSurvey[`qNum${props.opts.qNum}`] === undefined ||
      resultsSurvey[`qNum${props.opts.qNum}`] === null ||
      resultsSurvey[`qNum${props.opts.qNum}`] === ""
    ) {
      resultsSurvey[`qNum${props.opts.qNum}`] = "no-*-response";
    }
    localStorage.setItem("resultsSurvey", JSON.stringify(resultsSurvey));
  }, [props.opts.qNum]);

  // LOCAL STATE
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  // ON CHANGE
  const handleOnChange = (e) => {
    const resultsSurvey = JSON.parse(localStorage.getItem("resultsSurvey"));
    let value = e.target.value;
    setUserText(value);
    // record if answered or not
    if (value.length > 0) {
      let sanitizedText = sanitizeString(value);
      resultsSurvey[id] = sanitizedText;
    } else {
      resultsSurvey[id] = "no-*-response";
    }
    asyncLocalStorage.setItem("resultsSurvey", JSON.stringify(resultsSurvey));
  };

  // required question answer check
  let userTextLen = false;
  if (userText.length > 0 && userText !== "") {
    userTextLen = true;
  }

  useEffect(() => {
    if (
      (props.opts.required === true || props.opts.required === "true") &&
      checkRequiredQuestionsComplete === true &&
      userTextLen < 1
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
  }, [
    checkRequiredQuestionsComplete,
    userText,
    userTextLen,
    props.opts.required,
  ]);

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));
  const placeholder = props.opts.placeholder;

  return (
    <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
      <TitleBar>
        <div>{labelText}</div>
      </TitleBar>
      <TextAreaInput
        value={userText}
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
