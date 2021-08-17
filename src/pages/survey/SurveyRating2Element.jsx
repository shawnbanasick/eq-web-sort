import React, { useState } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";

const getOptionsArray = (options) => {
  let array = options.split(";");
  array = array.filter(function (e) {
    return e;
  });
  return array;
};

const localStore = store({});

const getScaleArray = (options) => {
  let array = options.split(";");
  return array;
};

const SurveyRatings2Element = (props) => {
  const optsArray = getOptionsArray(props.opts.options);
  const scaleArray = getScaleArray(props.opts.scale);

  const checkRequiredQuestionsComplete = true;
  let bgColor;
  let border;
  //   const nameValue = `question${props.opts.qNum}`;

  const testFunction = (name, value) => {
    console.log(name);
    // const value = "test1";
    // const value2 = value.charAt(value.length - 1) - 1;
    console.log(value);
    localStore[name] = value;
    // const updatedCheckedState = checkedState.map((item, index) =>
    //   index === value2 ? !item : item
    // );
    // setCheckedState(updatedCheckedState);
    console.log(localStore);
    localStorage.setItem("rating2State", JSON.stringify(localStore));
  };

  const handleChange = (e) => {
    e.stopPropagation();
    console.log(e.target.name, e.target.value);
    let name = e.target.name;
    let value = e.target.value;
    testFunction(name, value);
  };

  const testArray = localStorage.getItem("rating2State");
  const conditionalLength = testArray.length || 0;
  console.log(optsArray.length);
  console.log(testArray.length);
  const testValue = optsArray.length - conditionalLength;

  console.log("testValue: ", testValue);

  if (checkRequiredQuestionsComplete === true && testValue > 0) {
    bgColor = "lightpink";
    border = "2px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => (
      <ItemContainer onChange={handleChange} key={uuid()}>
        <span key={uuid()}>{item}</span>
        <RadioInput
          key={uuid()}
          id={`Q-${index}`}
          type="radio"
          value={scaleArray[0]}
          name={`qNum${props.opts.qNum}-${index + 1}`}
        />
        <RadioInput
          key={uuid()}
          id={`Q2-${index}`}
          type="radio"
          value={scaleArray[1]}
          name={`qNum${props.opts.qNum}-${index + 1}`}
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
  max-width: 1100px;
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
