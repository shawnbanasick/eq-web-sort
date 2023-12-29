import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import sanitizeString from "../../utilities/sanitizeString";
import useLocalStorage from "../../utilities/useLocalStorage";

const SurveyTextElement = (props) => {
  // HELPER FUNCTION
  const asyncLocalStorage = {
    async setItem(key, value) {
      await null;
      return localStorage.setItem(key, value);
    },
  };

  // PROPS
  let questionId = `qNum${props.opts.qNum}`;
  const checkRequiredQuestionsComplete = props.check;

  // PERSISTENT STATE
  const [userText, setUserText] = useLocalStorage(questionId, "");

  // set default
  useEffect(() => {
    const setDefaultAsync = async () => {
      const resultsSurvey =
        (await JSON.parse(localStorage.getItem("resultsSurvey"))) || {};
      console.log(props.opts.required);
      console.log(resultsSurvey[`qNum${props.opts.qNum}`]);
      if (
        resultsSurvey[`qNum${props.opts.qNum}`] === undefined ||
        resultsSurvey[`qNum${props.opts.qNum}`] === null ||
        resultsSurvey[`qNum${props.opts.qNum}`] === ""
      ) {
        if (props.opts.required === true) {
          resultsSurvey[`qNum${props.opts.qNum}`] = "no-*?*-response";
        } else {
          resultsSurvey[`qNum${props.opts.qNum}`] = "no response";
        }
      }
      await localStorage.setItem(
        "resultsSurvey",
        JSON.stringify(resultsSurvey)
      );
    };
    setDefaultAsync();
  }, [props.opts.qNum, props.opts.required]);

  // LOCAL STATE
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  // event handler
  const handleOnChange = (e) => {
    const resultsSurvey = JSON.parse(localStorage.getItem("resultsSurvey"));
    let value = e.target.value;
    let valueLen = value.length;
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
    setUserText(value);
    // record if answered or not
    if (valueLen > 0) {
      let sanitizedText = sanitizeString(value);
      resultsSurvey[`qNum${props.opts.qNum}`] = sanitizedText;
    } else {
      // for when participant deletes their answer after entering it
      if (props.opts.required === true) {
        resultsSurvey[`qNum${props.opts.qNum}`] = "no-*?*-response";
      } else {
        resultsSurvey[`qNum${props.opts.qNum}`] = "no response";
      }
    }
    asyncLocalStorage.setItem("resultsSurvey", JSON.stringify(resultsSurvey));
  }; // End event handler

  useEffect(() => {
    let userTextLen = false;
    if (userText.length > 0 && userText !== "") {
      userTextLen = true;
    }
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
  }, [checkRequiredQuestionsComplete, userText, props]);

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));
  const noteText = ReactHtmlParser(decodeHTML(props.opts.note));

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
