import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";
import setGlobalState from "../../globalState/setGlobalState";
import getGlobalState from "../../globalState/getGlobalState";

const SurveyRatings10Element = (props) => {
  useEffect(() => {
    const results = getGlobalState("resultsSurvey");

    let array = props.opts.options.split(";");
    array = array.filter(function (e) {
      return e;
    });

    const length = array.length;

    for (let i = 0; i < length; i++) {
      results[`qNum${props.opts.qNum}-${i + 1}`] = "no response";
    }

    setGlobalState("resultsSurvey", results);
  }, [props]);

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

  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );
  let bgColor;
  let border;

  // setup local state
  const [checkedState, setCheckedState] = useState(
    Array.from({ length: rows }, () => Array.from({ length: 10 }, () => false))
  );

  const handleChange = (selectedRow, column, e) => {
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");
    const results = getGlobalState("resultsSurvey");

    const id = `qNum${props.opts.qNum}`;

    let name = e.target.name;
    let value = e.target.value;

    // needed for required question check
    localStore[name] = value;

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
    results[name] = +value;
    setGlobalState("resultsSurvey", results);
  };

  // if is a required question, check if all parts answered
  const ratingState = localStore || {};
  const testArray = Object.keys(ratingState);
  const conditionalLength = testArray.length;
  const testValue = optsArray.length - conditionalLength;
  if (
    checkRequiredQuestionsComplete === true &&
    testValue > 0 &&
    props.opts.required === true
  ) {
    bgColor = "lightpink";
    border = "3px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => (
      <ItemContainer indexVal={index} key={uuid()}>
        <OptionsText key={uuid()}>{item}</OptionsText>
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
        <RadioInput
          key={uuid()}
          id={`Q3-${index}`}
          type="radio"
          value={3}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 2, e)}
          checked={checkedState[index][2]}
        />
        <RadioInput
          key={uuid()}
          id={`Q4-${index}`}
          type="radio"
          value={4}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 3, e)}
          checked={checkedState[index][3]}
        />
        <RadioInput
          key={uuid()}
          id={`Q5-${index}`}
          type="radio"
          value={5}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 4, e)}
          checked={checkedState[index][4]}
        />
        <RadioInput
          key={uuid()}
          id={`Q6-${index}`}
          type="radio"
          value={6}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 5, e)}
          checked={checkedState[index][5]}
        />
        <RadioInput
          key={uuid()}
          id={`Q7-${index}`}
          type="radio"
          value={7}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 6, e)}
          checked={checkedState[index][6]}
        />
        <RadioInput
          key={uuid()}
          id={`Q8-${index}`}
          type="radio"
          value={8}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 7, e)}
          checked={checkedState[index][7]}
        />
        <RadioInput
          key={uuid()}
          id={`Q9-${index}`}
          type="radio"
          value={9}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 8, e)}
          checked={checkedState[index][8]}
        />
        <RadioInput
          key={uuid()}
          id={`Q10-${index}`}
          type="radio"
          value={10}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 9, e)}
          checked={checkedState[index][9]}
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
          <CircleDiv>1</CircleDiv>
          <CircleDiv>2</CircleDiv>
          <CircleDiv>3</CircleDiv>
          <CircleDiv>4</CircleDiv>
          <CircleDiv>5</CircleDiv>
          <CircleDiv>6</CircleDiv>
          <CircleDiv>7</CircleDiv>
          <CircleDiv>8</CircleDiv>
          <CircleDiv>9</CircleDiv>
          <CircleDiv>10</CircleDiv>
        </RatingTitle>
        <RadioItems />
      </RadioContainer>
    </Container>
  );
};

export default view(SurveyRatings10Element);

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
  margin-top: 0px;
  height: auto;
  min-height: 50px;
  font-size: 18px;
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
  grid-template-columns: minmax(30%, 800px) 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px;
  margin-bottom: 17px;
  font-size: 16px;
  align-items: end;
  padding-bottom: 3px;
  height: 40px;
  background-color: ${(props) => (props.indexVal % 2 ? "white" : "lightgray")};
  border-radius: 3px;
`;

const RatingTitle = styled.div`
  display: inline-grid;
  grid-template-columns: minmax(30%, 800px) 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px 40px;
  margin-bottom: 7px;
  align-items: end;
`;

const CircleDiv = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  text-align: center;
`;

const RadioInput = styled.input`
  display: flex;
  justify-self: center;
  align-self: center;
  text-align: center;
  margin-bottom: 6px;
`;

const OptionsText = styled.span`
  margin-bottom: 2px;
  padding-left: 5px;
`;
