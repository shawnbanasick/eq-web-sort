import React, { useState } from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState.js";
import setGlobalState from "../../globalState/setGlobalState";

const SurveyTextAreaElement = (props) => {
  // let savedTextAreaText;
  const [userText, setUserText] = useState("");

  const handleOnChange = (e) => {
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");
    const results = getGlobalState("results");
    const id = `qNum${props.opts.qNum}`;

    let value = e.target.value;
    // value = value.trim();
    setUserText(value);

    // record if answered or not
    if (value.length > 0) {
      requiredAnswersObj[id] = "answered";
    } else {
      requiredAnswersObj[id] = "no response";
    }
    setGlobalState("requiredAnswersObj", requiredAnswersObj);

    results[`qNum${props.opts.qNum}-${props.opts.type}`] = value;
    setGlobalState("results", results);

    console.log(`qNum${props.opts.qNum}-${props.opts.type}`, value);
  };

  // required question answer check
  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );

  let bgColor;
  let border;

  console.log(userText.length);

  if (checkRequiredQuestionsComplete === true && userText.length === 0) {
    bgColor = "lightpink";
    border = "2px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  return (
    <Container bgColor={bgColor} border={border}>
      <TitleBar>{props.opts.label}</TitleBar>
      <TextAreaInput value={userText || ""} onChange={handleOnChange} />
    </Container>
  );

  // function useLocalStorage(key, initialValue) {
  //   // State to store our value
  //   // Pass initial state function to useState so logic is only executed once
  //   const [storedValue, setStoredValue] = useState(() => {
  //     try {
  //       // Get from local storage by key
  //       const item = window.localStorage.getItem(key);
  //       // Parse stored json or if none return initialValue
  //       return item ? JSON.parse(item) : initialValue;
  //     } catch (error) {
  //       // If error also return initialValue
  //       console.log(error);
  //       return initialValue;
  //     }
  //   });
  //   // Return a wrapped version of useState's setter function that ...
  //   // ... persists the new value to localStorage.
  //   const setValue = (value) => {
  //     try {
  //       // Allow value to be a function so we have same API as useState
  //       const valueToStore =
  //         value instanceof Function ? value(storedValue) : value;
  //       // Save state
  //       setStoredValue(valueToStore);
  //       // Save to local storage
  //       window.localStorage.setItem(key, JSON.stringify(valueToStore));
  //     } catch (error) {
  //       // A more advanced implementation would handle the error case
  //       console.log(error);
  //     }
  //   };
  //   return [storedValue, setValue];
  // }
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
  height: 50px;
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
  margin-top: 5px;
  height: 150px;
  font-size: 18px;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  border: 2px solid lightgray;
  padding: 5px;
`;
