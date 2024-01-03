import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useLocalStorage from "../../utilities/useLocalStorage";
import flatten from "lodash/flatten";
import countBy from "lodash/countBy";

const SurveyRatings2Element = (props) => {
  // HELPER FUNCTIONS
  const getOptionsArray = (options) => {
    let array = options.split(";;;");
    array = array.filter(function (e) {
      return e;
    });
    if (array.length === 0) {
      array = ["", ""];
    }
    return array;
  };

  // PROPS
  const optsArray = getOptionsArray(props.opts.options);
  const checkRequiredQuestionsComplete = props.check;
  // gives the number of questions
  const rows = optsArray.length;
  const questionId = `qNum${props.opts.qNum}`;
  const labelText = ReactHtmlParser(decodeHTML(props.opts.label)) || "";
  const noteText = ReactHtmlParser(decodeHTML(props.opts.note)) || "";
  let displayNoteText = true;
  if (noteText.length < 1 || noteText === "") {
    displayNoteText = false;
  }

  // PERSISTENT STATE
  let [checkedState, setCheckedState] = useLocalStorage(
    questionId,
    Array.from({ length: rows }, () => Array.from({ length: 2 }, () => false))
  );

  // LOCAL STATE
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });
  const [localStore, setLocalStore] = useState({});

  const scaleArray = getOptionsArray(props.opts.scale);

  // ****** ON CHANGE  *******
  const handleChange = (selectedRow, column, e) => {
    const resultsSurvey = JSON.parse(localStorage.getItem("resultsSurvey"));
    let name = e.target.name;
    let value = e.target.value;
    // needed for required question check
    const newObj = localStore;
    newObj[name] = value;
    setLocalStore(newObj);
    // update local state with radio selected
    const newArray = [];
    const newCheckedState = checkedState.map(function (row, index) {
      if (selectedRow === index) {
        row.map(function (item, index) {
          if (column === index) {
            newArray.push(true);
            return null;
          } else {
            newArray.push(false);
            return null;
          }
        });
        return newArray;
      } else {
        return row;
      }
    });
    setCheckedState(newCheckedState);
    // record if answered or not
    let arrayLen2 = checkedState.length;
    let flattenedCheckedState2 = flatten([...newCheckedState]);
    let count2 = countBy(flattenedCheckedState2);
    let objTestValue2 = count2[true] || 0;

    let textString = "";
    newCheckedState.forEach((item, index) => {
      // let name = `qNum${props.opts.qNum}-${index + 1}`;
      let value = item[0] ? "1" : "2";
      if (index === 0) {
        textString += value;
      } else {
        textString += "," + value;
      }
    });
    resultsSurvey[`qNum${props.opts.qNum}`] = textString;

    if (objTestValue2 !== arrayLen2) {
      if (props.opts.required === true || props.opts.required === "true") {
        resultsSurvey[`qNum${props.opts.qNum}`] = "no-*?*-response";
      } else {
        resultsSurvey[`qNum${props.opts.qNum}`] = "no response";
      }
    }
    localStorage.setItem("resultsSurvey", JSON.stringify(resultsSurvey));
  }; // end handleChange

  // ****** CHECK IF ALL PARTS ANSWERED on render *******
  let setYellow = false;
  let arrayLen = checkedState.length;
  let flattenedCheckedState = flatten([...checkedState]);
  let count = countBy(flattenedCheckedState);
  let objTestValue = count[true] || 0;
  if (objTestValue < arrayLen) {
    setYellow = true;
  }

  useEffect(() => {
    // if is a required question, check if all parts answered
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

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => {
      const itemText = ReactHtmlParser(decodeHTML(item)) || "";
      return (
        <ItemContainer indexVal={index} key={uuid()}>
          <OptionsText key={uuid()}>{itemText}</OptionsText>
          <RadioInput
            key={uuid()}
            id={`Q-${index}`}
            type="radio"
            value={1}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 0, e)}
            checked={checkedState[index][0]}
          />
          <RadioInput
            key={uuid()}
            id={`Q2-${index}`}
            type="radio"
            value={2}
            name={`qNum${props.opts.qNum}-${index + 1}`}
            onChange={(e) => handleChange(index, 1, e)}
            checked={checkedState[index][1]}
          />
        </ItemContainer>
      );
    });
    return <div>{radioList}</div>;
  };

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
          <RatingTitle>
            <div />
            <ScaleDiv>
              <div>{ReactHtmlParser(decodeHTML(scaleArray[0]))}</div>
            </ScaleDiv>
            <ScaleDiv>
              <div>{ReactHtmlParser(decodeHTML(scaleArray[1]))}</div>
            </ScaleDiv>
          </RatingTitle>
          <RadioItems />
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
          <RatingTitle>
            <div />
            <ScaleDiv>
              <div>{ReactHtmlParser(decodeHTML(scaleArray[0]))}</div>
            </ScaleDiv>
            <ScaleDiv>
              <div>{ReactHtmlParser(decodeHTML(scaleArray[1]))}</div>
            </ScaleDiv>
          </RatingTitle>
          <RadioItems />
        </RadioContainer>
      </Container>
    );
  }
};

export default SurveyRatings2Element;

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
  height: auto;
  min-height: 50px;
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

const ItemContainer = styled.div`
  display: inline-grid;
  grid-template-columns: minmax(30%, 900px) 100px 100px 150px;
  margin-bottom: 17px;
  padding-left: 5px;
  padding-bottom: 8px;
  height: 40px;
  align-items: end;
  background-color: ${(props) => (props.indexVal % 2 ? "white" : "#ececec")};
  &:hover {
    background-color: rgba(131, 202, 254, 0.4);
  }
`;

const RatingTitle = styled.div`
  display: inline-grid;
  grid-template-columns: minmax(30%, 900px) 100px 100px 150px;
  margin-bottom: 7px;
`;

const ScaleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioInput = styled.input`
  display: flex;
  justify-self: center;
  align-self: center;
  border: 0px;
  width: 100%;
  height: 1.4em;
`;

const OptionsText = styled.span`
  margin-bottom: 2px;
  padding-left: 5px;
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
