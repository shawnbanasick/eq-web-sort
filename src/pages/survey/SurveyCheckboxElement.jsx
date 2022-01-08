import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useStore from "../../globalState/useStore";

const getResults = (state) => state.resultsSurvey;
const getSetResultsSurvey = (state) => state.setResultsSurvey;
const getCheckReqQsComplete = (state) => state.checkRequiredQuestionsComplete;
const getRequiredAnswersObj = (state) => state.requiredAnswersObj;
const getSetRequiredAnswersObj = (state) => state.setRequiredAnswersObj;
const getAnswersStorage = (state) => state.answersStorage;
const getSetAnswersStorage = (state) => state.setAnswersStorage;

const SurveyCheckboxElement = (props) => {
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

  let [hasBeenAnswered, setHasBeenAnswered] = useState(false);

  let localStore = {};

  const getOptionsArray = (options) => {
    let array = options.split(";;;");
    array = array.filter(function (e) {
      return e;
    });
    array.map((x) => (localStore[x] = false));
    return array;
  };

  const optsArray = getOptionsArray(props.opts.options);
  const nameValue = `question${props.opts.qNum}`;

  let bgColor;
  let border;

  let [checkedState, setCheckedState] = useState(
    new Array(optsArray.length).fill(false)
  );

  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  const id = `qNum${props.opts.qNum}`;

  // HANDLE CHANGE
  const handleChange = (position) => {
    position = parseInt(position, 10);
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    answersStorage[id] = updatedCheckedState;
    setAnswersStorage(answersStorage);
    console.log(JSON.stringify(answersStorage));

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

    if (selected.length > 0) {
      setHasBeenAnswered(true);
      requiredAnswersObj[id] = "answered";
    } else {
      setHasBeenAnswered(false);

      requiredAnswersObj[id] = "no response";
      selected = "no response";
    }

    results[`qNum${props.opts.qNum}`] = selected;
    setResultsSurvey(results);
    setRequiredAnswersObj(requiredAnswersObj);
  };

  if (id in answersStorage) {
    let response = answersStorage[id];

    console.log(JSON.stringify(response));

    checkedState = response;
    hasBeenAnswered = true;

    let selected = response.reduce((text = "", currentState, index) => {
      if (currentState === true) {
        return text + (index + 1).toString() + "|";
      }
      return text;
    }, "");

    if (selected.charAt(selected.length - 1) === "|") {
      selected = selected.substring(0, selected.length - 1);
    }

    requiredAnswersObj[id] = "answered";

    console.log(JSON.stringify(selected));

    results[`qNum${props.opts.qNum}`] = selected;
    console.log(JSON.stringify(results));

    setResultsSurvey(results);
    setRequiredAnswersObj(requiredAnswersObj);
  }

  useEffect(() => {
    if (
      (props.opts.required === true || props.opts.required === "true") &&
      checkRequiredQuestionsComplete === true &&
      hasBeenAnswered === false
    ) {
      setFormatOptions({ bgColor: "lightpink", border: "3px dashed black" });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, hasBeenAnswered, props.opts.required]);

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));

  console.log(JSON.stringify(results));

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
