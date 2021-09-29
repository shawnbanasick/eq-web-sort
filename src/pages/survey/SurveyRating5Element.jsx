import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";
import setGlobalState from "../../globalState/setGlobalState";
import getGlobalState from "../../globalState/getGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

const SurveyRatings5Element = (props) => {
  let isRequired = props.opts.required;
  if (isRequired === "true") {
    isRequired = true;
  }

  // let savedTextAreaText;
  const [testValue, setTestValue] = useState(5);
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  useEffect(() => {
    const results = getGlobalState("resultsSurvey");

    let array = props.opts.options.split(";;;");
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
    let array = options.split(";;;");
    array = array.filter(function (e) {
      return e;
    });
    return array;
  };

  // to use with required check and related css formating
  const local5Store = store({});

  const optsArray = getOptionsArray(props.opts.options);
  const rows = optsArray.length;

  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );

  // setup local state with length 5
  const [checked5State, setChecked5State] = useState(
    Array.from({ length: rows }, () => Array.from({ length: 5 }, () => false))
  );

  const handleChange = (selectedRow, column, e) => {
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");
    const results = getGlobalState("resultsSurvey");

    const id = `qNum${props.opts.qNum}`;

    let name = e.target.name;
    let value = e.target.value;

    // needed for required question check
    local5Store[name] = value;

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

    // record if answered or not
    if (newChecked5State.length > 0) {
      requiredAnswersObj[id] = "answered";
    } else {
      requiredAnswersObj[id] = "no response";
    }
    setGlobalState("requiredAnswersObj", requiredAnswersObj);
    results[name] = +value;
    setGlobalState("resultsSurvey", results);

    // if is a required question, check if all parts answered
    const rating5State = local5Store;
    const testArray = Object.keys(rating5State);
    const conditionalLength = testArray.length;
    setTestValue(optsArray.length - conditionalLength);
  };

  useEffect(() => {
    // if is a required question, check if all parts answered
    if (
      checkRequiredQuestionsComplete === true &&
      testValue > 0 &&
      isRequired === true
    ) {
      setFormatOptions({ bgColor: "lightpink", border: "3px dashed black" });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, testValue, isRequired]);

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => {
      const itemText = ReactHtmlParser(decodeHTML(item));
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
      );
    });
    return <div>{radioList}</div>;
  };

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));

  return (
    <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
      <TitleBar>{labelText}</TitleBar>
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
  grid-template-columns: minmax(30%, 900px) 50px 50px 50px 50px 50px 50px;
  margin-bottom: 17px;
  padding-bottom: 3px;
  height: 40px;
  background-color: ${(props) => (props.indexVal % 2 ? "white" : "#ececec")};
  font-size: 16px;
  align-items: end;
`;

const RatingTitle = styled.div`
  display: inline-grid;
  grid-template-columns: minmax(30%, 900px) 50px 50px 50px 50px 50px 50px;
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

const OptionsText = styled.span`
  margin-bottom: 2px;
  padding-left: 5px;
`;
