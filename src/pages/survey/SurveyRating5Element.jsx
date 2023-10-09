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

const SurveyRatings5Element = (props) => {
  // STATE
  const results = useStore(getResults);
  const setResultsSurvey = useStore(getSetResultsSurvey);
  const checkRequiredQuestionsComplete = useStore(getCheckReqQsComplete);
  const requiredAnswersObj = useStore(getRequiredAnswersObj);
  const setRequiredAnswersObj = useStore(getSetRequiredAnswersObj);
  const answersStorage = useStore(getAnswersStorage);
  const setAnswersStorage = useStore(getSetAnswersStorage);

  // let savedTextAreaText;
  let [testValue, setTestValue] = useState(5);
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  useEffect(() => {
    let array = props.opts.options.split(";;;");
    array = array.filter(function (e) {
      return e;
    });
    const length = array.length;
    for (let i = 0; i < length; i++) {
      results[`qNum${props.opts.qNum}-${i + 1}`] = "no response";
    }
    setResultsSurvey(results);
  }, [props, results, setResultsSurvey]);

  // filter to remove empty strings if present
  const getOptionsArray = (options) => {
    let array = options.split(";;;");
    array = array.filter(function (e) {
      return e;
    });
    return array;
  };

  // to use with required check and related css formating
  const [local5Store, setLocal5Store] = useState({});

  const optsArray = getOptionsArray(props.opts.options);
  const rows = optsArray.length;

  // setup local state with length 5
  let [checked5State, setChecked5State] = useState(
    Array.from({ length: rows }, () => Array.from({ length: 5 }, () => false))
  );

  const id = `qNum${props.opts.qNum}`;

  // HANDLE CHANGE
  const handleChange = (selectedRow, column, e) => {
    let name = e.target.name;
    let value = e.target.value;

    // needed for required question check
    const newObj = local5Store;
    newObj[name] = value;
    setLocal5Store(newObj);
    answersStorage[id] = newObj;

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

    answersStorage[id]["checkedState"] = [...newChecked5State];
    setAnswersStorage(answersStorage);

    // record if answered or not
    if (newChecked5State.length > 0) {
      requiredAnswersObj[id] = "answered";
    } else {
      requiredAnswersObj[id] = "no response";
    }
    setRequiredAnswersObj(requiredAnswersObj);
    results[name] = +value;

    setResultsSurvey(results);

    // if is a required question, check if all parts answered
    // const rating5State = local5Store;
    const testArray = Object.keys(local5Store);
    const conditionalLength = testArray.length;
    setTestValue(optsArray.length - conditionalLength);
  };

  if (id in answersStorage) {
    const keys2 = Object.keys(answersStorage[id]);

    // skip check that all answered if not required
    // prevents error in which answering only one
    // prevents navigation
    if (props.opts.required === true || props.opts.required === "true") {
      let objLen = keys2.length - 1;
      if (objLen >= rows) {
        testValue = 0;
        requiredAnswersObj[id] = "answered";
        setRequiredAnswersObj(requiredAnswersObj);
      } else {
        testValue = 1;
        requiredAnswersObj[id] = "no response";
        setRequiredAnswersObj(requiredAnswersObj);
      }
    }

    keys2.forEach((item, index) => {
      if (item !== "checkedState") {
        results[item] = answersStorage[id][item];
      }
    });

    checked5State = [...answersStorage[id]["checkedState"]];
  }

  useEffect(() => {
    // if is a required question, check if all parts answered
    if (
      (props.opts.required === true || props.opts.required === "true") &&
      checkRequiredQuestionsComplete === true &&
      testValue > 0
    ) {
      setFormatOptions({ bgColor: "#fde047", border: "3px dashed black" });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, testValue, props.opts.required]);

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
      <TitleBar>
        <div>{labelText}</div>
      </TitleBar>
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

export default SurveyRatings5Element;

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
  padding-bottom: 8px;
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
  border: 0px;
  width: 100%;
  height: 1.4em;
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
