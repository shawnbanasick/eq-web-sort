import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import sanitizeString from "../../utilities/sanitizeString.js";
import useStore from "../../globalState/useStore.js";

const SurveyTextAreaElement = (props) => {
  // STATE
  const results = useStore((state) => state.resultsSurvey);
  const setResultsSurvey = useStore((state) => state.setResultsSurvey);
  const checkRequiredQuestionsComplete = useStore(
    (state) => state.checkRequiredQuestionsComplete
  );
  const requiredAnswersObj = useStore((state) => state.requiredAnswersObj);
  const setRequiredAnswersObj = useStore(
    (state) => state.setRequiredAnswersObj
  );

  let isRequired = props.opts.required;
  if (isRequired === "true") {
    isRequired = true;
  }

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

  const handleOnChange = (e) => {
    const id = `qNum${props.opts.qNum}`;

    let value = e.target.value;
    // value = value.trim();
    setUserText(value);

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

  useEffect(() => {
    if (
      checkRequiredQuestionsComplete === true &&
      isRequired === true &&
      userText.length < 1
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
  }, [checkRequiredQuestionsComplete, userText, isRequired]);

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));
  const placeholder = props.opts.placeholder;

  return (
    <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
      <TitleBar>
        <div>{labelText}</div>
      </TitleBar>
      <TextAreaInput
        value={userText || ""}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
    </Container>
  );
};

export default view(SurveyTextAreaElement);

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 200px;
  background-color: whitesmoke;
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.border};
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
