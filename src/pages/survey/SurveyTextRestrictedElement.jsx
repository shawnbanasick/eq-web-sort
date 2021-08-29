import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

const SurveyTextElement = (props) => {
  useEffect(() => {
    const results = getGlobalState("results");
    results[`qNum${props.opts.qNum}`] = "no response";
    setGlobalState("results", results);
  }, [props]);

  // let savedRestrictedText;
  const [number, setNumber] = useState(""); // useLocalStorage("saveRestrictedText", savedRestrictedText  );

  const handleOnChange = (e) => {
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");
    const results = getGlobalState("results");

    const id = `qNum${props.opts.qNum}`;

    let value = e.target.value.replace(/\D/g, "");
    let valueLen = value.length;
    if (props.opts.restricted === "true") {
      if (value.length > +props.opts.limitLength) {
        value = value.substring(0, props.opts.limitLength);
      }
    }
    setNumber(value);

    // record if answered or not
    if (valueLen > 0) {
      requiredAnswersObj[id] = "answered";
      results[`qNum${props.opts.qNum}`] = value;
    } else {
      results[`qNum${props.opts.qNum}`] = "no response";
      requiredAnswersObj[id] = "no response";
    }
    setGlobalState("requiredAnswersObj", requiredAnswersObj);
    setGlobalState("results", results);
  };

  // required question answer check
  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );

  let bgColor;
  let border;

  // required question answer check
  let userTextLen;

  if (!number) {
    userTextLen = 0;
  } else {
    userTextLen = number.length;
  }
  if (checkRequiredQuestionsComplete === true && userTextLen < 1) {
    bgColor = "lightpink";
    border = "2px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  return (
    <Container bgColor={bgColor} border={border}>
      <TitleBar>{props.opts.label}</TitleBar>
      <NoteText>{props.opts.note}</NoteText>
      <TextInput value={number || ""} onChange={handleOnChange} />
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
  padding-left: 5px;
  padding-right: 5px;
`;
