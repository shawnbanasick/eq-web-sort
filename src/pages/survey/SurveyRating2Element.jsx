import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";
import setGlobalState from "../../globalState/setGlobalState";
import getGlobalState from "../../globalState/getGlobalState";

const SurveyRatings2Element = (props) => {
  useEffect(() => {
    const results = getGlobalState("results");
    results[`qNum${props.opts.qNum}`] = "no response";
    setGlobalState("results", results);
  }, [props]);

  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );
  let bgColor;
  let border;

  // filter to remove empty strings if present
  const getOptionsArray = (options) => {
    let array = options.split(";");
    array = array.filter(function (e) {
      return e;
    });
    return array;
  };

  // to use with required check and related css formating
  const localStore = store({});

  const optsArray = getOptionsArray(props.opts.options);
  const rows = optsArray.length;

  const getScaleArray = (options) => {
    let array = options.split(";");
    return array;
  };
  const scaleArray = getScaleArray(props.opts.scale);

  // setup local state
  const [checkedState, setCheckedState] = useState(
    Array.from({ length: rows }, () => Array.from({ length: 2 }, () => false))
  );

  const handleChange = (selectedRow, column, e) => {
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");
    const results = getGlobalState("results");

    const id = `qNum${props.opts.qNum}`;

    let name = e.target.name;
    let value = e.target.value;

    // needed for required question check
    localStore[name] = value;

    // console.log(name, value);

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
    if (newCheckedState.length > 0) {
      requiredAnswersObj[id] = "answered";
    } else {
      requiredAnswersObj[id] = "no response";
    }
    setGlobalState("requiredAnswersObj", requiredAnswersObj);

    console.log(name, value);
    results[name] = +value;
    setGlobalState("results", results);
  };

  // if is a required question, check if all parts answered
  const rating2State = localStore || {};
  const testArray = Object.keys(rating2State);
  const conditionalLength = testArray.length;
  const testValue = optsArray.length - conditionalLength;
  if (checkRequiredQuestionsComplete === true && testValue > 0) {
    bgColor = "lightpink";
    border = "2px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => (
      <ItemContainer key={uuid()}>
        <span key={uuid()}>{item}</span>
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
    ));
    return <div>{radioList}</div>;
  };

  return (
    <Container bgColor={bgColor} border={border}>
      <TitleBar>{props.opts.label}</TitleBar>
      <RadioContainer>
        <RatingTitle>
          <div />
          <ScaleDiv>{scaleArray[0]}</ScaleDiv>
          <ScaleDiv>{scaleArray[1]}</ScaleDiv>
        </RatingTitle>
        <RadioItems />
      </RadioContainer>
    </Container>
  );
};

export default view(SurveyRatings2Element);

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

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 20px;
  vertical-align: center;
  margin-top: 5px;
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
  grid-template-columns: 28vw 100px 100px 150px;
  margin-bottom: 17px;
  padding-left: 5px;
  align-items: end;
`;

const RatingTitle = styled.div`
  display: inline-grid;
  grid-template-columns: 28vw 100px 100px 150px;
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
`;
