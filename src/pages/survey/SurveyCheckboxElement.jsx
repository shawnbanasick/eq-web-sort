import React, { useState } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

const localStore = store({});

const localStore2 = store({
  hasBeenAnswered: false,
});

const getOptionsArray = (options) => {
  let array = options.split(";");
  array = array.filter(function (e) {
    return e;
  });
  array.map((x) => (localStore[x] = false));
  return array;
};

const SurveyCheckboxElement = (props) => {
  const optsArray = getOptionsArray(props.opts.options);
  const nameValue = `question${props.opts.qNum}`;

  // required question answer check
  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );
  let bgColor;
  let border;

  const [checkedState, setCheckedState] = useState(
    new Array(optsArray.length).fill(false)
  );

  const handleChange = (position) => {
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");
    const results = getGlobalState("results");
    const id = `qNum${props.opts.qNum}`;

    position = parseInt(position, 10);
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

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

    console.log();
    if (selected.length > 0) {
      localStore2.hasBeenAnswered = true;
      requiredAnswersObj[id] = "answered";
    } else {
      localStore2.hasBeenAnswered = false;
      requiredAnswersObj[id] = "no response";
      selected = "no response";
    }

    results[`qNum${props.opts.qNum}-${props.opts.type}`] = selected;
    setGlobalState("results", results);
    setGlobalState("requiredAnswersObj", requiredAnswersObj);

    // console.log(`qNum${props.opts.qNum}-${props.opts.type}`, selected);
  };

  // required question answered?
  const hasBeenAnswered = localStore2.hasBeenAnswered;
  // console.log(hasBeenAnswered);
  if (checkRequiredQuestionsComplete === true && hasBeenAnswered === false) {
    bgColor = "lightpink";
    border = "2px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  return (
    <Container bgColor={bgColor} border={border}>
      <TitleBar>{props.opts.label}</TitleBar>
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

export default view(SurveyCheckboxElement);

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 150px;
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

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 20px;
  vertical-align: center;
  margin-top: 5px;
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
