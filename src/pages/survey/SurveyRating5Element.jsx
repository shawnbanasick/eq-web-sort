import React, { useState } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";
// import setGlobalState from "../../globalState/setGlobalState";
// import getGlobalState from "../../globalState/getGlobalState";

// filter to remove empty strings if present
const getOptionsArray = (options) => {
  let array = options.split(";");
  array = array.filter(function (e) {
    return e;
  });
  return array;
};

// to use with required check and related css formating
const local5Store = store({});

const SurveyRatings5Element = (props) => {
  const optsArray = getOptionsArray(props.opts.options);
  const rows = optsArray.length;
  const checkRequiredQuestionsComplete = true;
  let bgColor;
  let border;

  // setup local state with length 5
  const [checked5State, setChecked5State] = useState(
    Array.from({ length: rows }, () => Array.from({ length: 5 }, () => false))
  );

  const handleChange = (selectedRow, column, e) => {
    let name = e.target.name;
    let value = e.target.value;

    // needed for required question check
    local5Store[name] = value;

    console.log(name, value);

    // update local state with radio selected
    const newArray = [];
    const newChecked5State = checked5State.map(function (row, index) {
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
    setChecked5State(newChecked5State);
  };

  // if is a required question, check if all parts answered
  const rating5State = local5Store || {};
  const testArray = Object.keys(rating5State);
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
          checked={checked5State[index][0]}
        />
        <RadioInput
          key={uuid()}
          id={`Q2-${index}`}
          type="radio"
          value={2}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 1, e)}
          checked={checked5State[index][1]}
        />
        <RadioInput
          key={uuid()}
          id={`Q3-${index}`}
          type="radio"
          value={3}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 2, e)}
          checked={checked5State[index][2]}
        />
        <RadioInput
          key={uuid()}
          id={`Q4-${index}`}
          type="radio"
          value={4}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 3, e)}
          checked={checked5State[index][3]}
        />
        <RadioInput
          key={uuid()}
          id={`Q5-${index}`}
          type="radio"
          value={5}
          name={`qNum${props.opts.qNum}-${index + 1}`}
          onChange={(e) => handleChange(index, 4, e)}
          checked={checked5State[index][4]}
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
        </RatingTitle>
        <RadioItems />
      </RadioContainer>
    </Container>
  );
};

export default view(SurveyRatings5Element);

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
  grid-template-columns: 28vw 50px 50px 50px 50px 50px 50px;
  margin-bottom: 17px;
  font-size: 16px;
  align-items: end;
`;

const RatingTitle = styled.div`
  display: inline-grid;
  grid-template-columns: 28vw 50px 50px 50px 50px 50px 50px;
  margin-bottom: 7px;
  align-items: end;
`;

const RadioInput = styled.input`
  display: flex;
  justify-self: center;
  align-self: center;
  text-align: center;
`;

const CircleDiv = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  text-align: center;
`;
