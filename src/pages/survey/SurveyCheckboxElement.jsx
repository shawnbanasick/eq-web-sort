import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useStore from "../../globalState/useStore";
import useLocalStorage from "../../utilities/useLocalStorage";

const getResults = (state) => state.resultsSurvey;
const getSetResultsSurvey = (state) => state.setResultsSurvey;
const getCheckReqQsComplete = (state) => state.checkRequiredQuestionsComplete;
const getRequiredAnswersObj = (state) => state.requiredAnswersObj;
const getSetRequiredAnswersObj = (state) => state.setRequiredAnswersObj;

const SurveyCheckboxElement = (props) => {
  // HELPER FUNCTIONS
  let localStore = {};
  const getOptionsArray = (options) => {
    let array = options.split(";;;");
    array = array.filter(function (e) {
      return e;
    });
    array.map((x) => (localStore[x] = false));
    return array;
  };

  // PROPS
  const optsArray = getOptionsArray(props.opts.options);
  const nameValue = `question${props.opts.qNum}`;
  const id = `qNum${props.opts.qNum}`;

  // GLOBAL STATE
  const results = useStore(getResults);
  const setResultsSurvey = useStore(getSetResultsSurvey);
  const checkRequiredQuestionsComplete = useStore(getCheckReqQsComplete);
  const requiredAnswersObj = useStore(getRequiredAnswersObj);
  const setRequiredAnswersObj = useStore(getSetRequiredAnswersObj);

  // PERSISTENT STATE
  const answersStorage =
    JSON.parse(localStorage.getItem("answersStorage")) || {};
  let questionId = props.opts.id;
  let [checkedState, setCheckedState] = useLocalStorage(
    questionId,
    new Array(optsArray.length).fill(false)
  );

  // LOCAL STATE
  let [hasBeenAnswered, setHasBeenAnswered] = useState(false);
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  // PRELOAD "no response" in state
  useEffect(() => {
    results[`qNum${props.opts.qNum}`] = "no response";
    setResultsSurvey(results);
  }, [props, results, setResultsSurvey]);

  // HANDLE CHANGE
  const handleChange = (position) => {
    position = parseInt(position, 10);
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    answersStorage[id] = updatedCheckedState;
    localStorage.setItem("answersStorage", JSON.stringify(answersStorage));
    // prep the selected answers for storage
    let selected = updatedCheckedState.reduce(
      (text = "", currentState, index) => {
        if (currentState === true) {
          return text + (index + 1).toString() + "|";
        }
        return text;
      },
      ""
    );
    if (selected.charAt(selected.length - 1) === "|") {
      selected = selected.substr(0, selected.length - 1);
    }
    // determine if the question has been answered - yellow highlight
    if (selected.length > 0) {
      setHasBeenAnswered(true);
      requiredAnswersObj[id] = "answered";
    } else {
      setHasBeenAnswered(false);
      requiredAnswersObj[id] = "no response";
      selected = "no response";
    }
    // store the selected answers in the results object
    results[`qNum${props.opts.qNum}`] = selected;
    setResultsSurvey(results);
    setRequiredAnswersObj(requiredAnswersObj);
  }; // end handleChange

  // Persist answers
  let selected = "";
  if (id in answersStorage) {
    let response = answersStorage[id];
    // prep the selected answers for storage
    selected = response.reduce((text = "", currentState, index) => {
      if (currentState === true) {
        return text + (index + 1).toString() + "|";
      }
      return text;
    }, "");
    if (selected.charAt(selected.length - 1) === "|") {
      checkedState = response;
      hasBeenAnswered = true;
      selected = selected.substring(0, selected.length - 1);
    }
    requiredAnswersObj[id] = "answered";
    results[`qNum${props.opts.qNum}`] = selected;
    setResultsSurvey(results);
    setRequiredAnswersObj(requiredAnswersObj);
    console.log(selected);
  }

  let selectedLen = false;
  if (selected.length > 0) {
    selectedLen = true;
  }

  console.log("checkedstate", checkedState);

  // determine if highlight needed
  useEffect(() => {
    if (
      (props.opts.required === true || props.opts.required === "true") &&
      checkRequiredQuestionsComplete === true &&
      selectedLen === false
    ) {
      setFormatOptions({ bgColor: "#fde047", border: "3px dashed black" });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [
    checkRequiredQuestionsComplete,
    hasBeenAnswered,
    selectedLen,
    props.opts.required,
  ]);

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));

  return (
    <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
      <TitleBar>
        <div>{labelText}</div>
      </TitleBar>
      <RadioContainer>
        {optsArray.map((item, index) => {
          return (
            <div key={uuid()}>
              <input
                id={`${item}-${index}`}
                type="checkbox"
                value={item}
                name={nameValue}
                checked={checkedState[index]}
                onChange={() => handleChange(index)}
              />
              <label htmlFor={`${item}-${index}`}>{item}</label>
            </div>
          );
        })}
      </RadioContainer>
    </Container>
  );
};

export default SurveyCheckboxElement;

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 150px;
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

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 20px;
  vertical-align: center;
  margin-top: 0px;
  min-height: 120px;
  font-size: 16px;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  border: 2px solid lightgray;

  input {
    margin-top: 8px;
  }

  label {
    margin-left: 8px;
  }
`;
