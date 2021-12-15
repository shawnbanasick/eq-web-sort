import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

const SurveyCheckboxElement = (props) => {
  useEffect(() => {
    const results = getGlobalState("resultsSurvey");
    results[`qNum${props.opts.qNum}`] = "no response";
    setGlobalState("resultsSurvey", results);
  }, [props]);

  const localStore = store({});

  const localStore2 = store({
    hasBeenAnswered: false,
  });

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
    const results = getGlobalState("resultsSurvey");
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

    if (selected.length > 0) {
      localStore2.hasBeenAnswered = true;
      requiredAnswersObj[id] = "answered";
    } else {
      localStore2.hasBeenAnswered = false;
      requiredAnswersObj[id] = "no response";
      selected = "no response";
    }

    results[`qNum${props.opts.qNum}`] = selected;
    setGlobalState("resultsSurvey", results);
    setGlobalState("requiredAnswersObj", requiredAnswersObj);
  };

  const hasBeenAnswered = localStore2.hasBeenAnswered;
  if (
    checkRequiredQuestionsComplete === true &&
    hasBeenAnswered === false &&
    props.opts.required === true
  ) {
    bgColor = "lightpink";
    border = "3px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));

  return (
    <Container bgColor={bgColor} border={border}>
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
