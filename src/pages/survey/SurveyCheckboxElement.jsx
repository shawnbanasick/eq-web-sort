import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useLocalStorage from "../../utilities/useLocalStorage";
import flatten from "lodash/flatten";
import countBy from "lodash/countBy";

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
  const checkRequiredQuestionsComplete = props.check;
  const optsArray = getOptionsArray(props.opts.options);
  const nameValue = `question${props.opts.itemNum}`;
  let questionId = props.opts.id;
  const labelText = ReactHtmlParser(decodeHTML(props.opts.label)) || "";
  const noteText = ReactHtmlParser(decodeHTML(props.opts.note)) || "";
  let displayNoteText = true;
  if (noteText.length < 1 || noteText === "") {
    displayNoteText = false;
  }

  // PERSISTENT STATE
  let [checkedState, setCheckedState] = useLocalStorage(
    questionId,
    new Array(optsArray.length).fill(false)
  );

  // LOCAL STATE
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  // HANDLE CHANGE
  const handleChange = (position) => {
    const resultsSurvey = JSON.parse(localStorage.getItem("resultsSurvey"));
    position = parseInt(position, 10);
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    // prep the selected answers for storage
    let selected = updatedCheckedState.reduce(
      (text = "", currentState, index) => {
        if (currentState === true) {
          return text + (index + 1).toString() + ",";
        }
        return text;
      },
      ""
    );
    if (selected.charAt(selected.length - 1) === ",") {
      selected = selected.substr(0, selected.length - 1);
    }
    // store the selected answers in the results object
    resultsSurvey[`itemNum${props.opts.itemNum}`] = selected;

    if (selected === "") {
      if (props.opts.required === true || props.opts.required === "true") {
        resultsSurvey[`itemNum${props.opts.itemNum}`] = "no-*?*-response";
      } else {
        resultsSurvey[`itemNum${props.opts.itemNum}`] = "no response";
      }
    }
    localStorage.setItem("resultsSurvey", JSON.stringify(resultsSurvey));
  }; // end handleChange

  // ****** CHECK IF ALL PARTS ANSWERED on render *******
  let setYellow = false;
  let flattenedCheckedState = flatten([...checkedState]);
  let count = countBy(flattenedCheckedState);
  let objTestValue = count[true] || 0;
  if (objTestValue === 0) {
    setYellow = true;
  }

  // determine if highlight needed
  useEffect(() => {
    if (
      (props.opts.required === true || props.opts.required === "true") &&
      checkRequiredQuestionsComplete === true &&
      setYellow
    ) {
      setFormatOptions({
        bgColor: "rgba(253, 224, 71, .5)",
        border: "3px dashed black",
      });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, setYellow, props.opts.required]);

  if (displayNoteText) {
    return (
      <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
        <TitleBar>
          <div>{labelText}</div>
        </TitleBar>
        <NoteText id="noteText">
          <div>{noteText}</div>
        </NoteText>
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
  } else {
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
  }
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

const NoteText = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  vertical-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 50px;
  font-size: 16px;
  text-align: center;
  background-color: whitesmoke;
  width: 100%;
  border-radius: 3px;
`;
