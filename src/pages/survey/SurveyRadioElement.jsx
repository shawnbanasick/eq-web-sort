import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useStore from "../../globalState/useStore";

let getResults = (state) => state.resultsSurvey;
const getSetResultsSurvey = (state) => state.setResultsSurvey;
const getCheckReqQsComplete = (state) => state.checkRequiredQuestionsComplete;
const getRequiredAnswersObj = (state) => state.requiredAnswersObj;
const getSetRequiredAnswersObj = (state) => state.setRequiredAnswersObj;
const getAnswersStorage = (state) => state.answersStorage;
const getSetAnswersStorage = (state) => state.setAnswersStorage;

const SurveyRadioElement = (props) => {
  // STATE
  let results = useStore(getResults);
  const setResultsSurvey = useStore(getSetResultsSurvey);
  const checkRequiredQuestionsComplete = useStore(getCheckReqQsComplete);
  const requiredAnswersObj = useStore(getRequiredAnswersObj);
  const setRequiredAnswersObj = useStore(getSetRequiredAnswersObj);
  const answersStorage = useStore(getAnswersStorage);
  const setAnswersStorage = useStore(getSetAnswersStorage);

  console.log(answersStorage);

  // local state for required question warning
  let [testValue, setTestValue] = useState(false);
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  useEffect(() => {
    results[`qNum${props.opts.qNum}`] = "no response";
    setResultsSurvey(results);
  }, [props, results, setResultsSurvey]);

  const getOptionsArray = (options) => {
    let array = options.split(";;;");
    array = array.filter(function (e) {
      return e;
    });
    array = array.map((x) => x.replace(/\s/g, ""));
    return array;
  };

  const optsArray = getOptionsArray(props.opts.options);

  // template
  const RadioInput = ({ label, value, checked, setter }) => {
    return (
      <label>
        <InputStyleDiv>
          <input
            type="radio"
            checked={checked === value}
            onChange={() => setter(value)}
            value={value}
          />
          <LabelDiv>
            <div>{label}</div>
          </LabelDiv>
        </InputStyleDiv>
      </label>
    );
  };

  const id = `qNum${props.opts.qNum}`;

  let [selected, setSelected] = useState();

  const handleChange = (e) => {
    requiredAnswersObj[id] = "answered";
    setRequiredAnswersObj(requiredAnswersObj);

    results[`qNum${props.opts.qNum}`] = +e.target.value + 1;

    answersStorage[`qNum${props.opts.qNum}`] = +e.target.value;
    setAnswersStorage(answersStorage);
    setResultsSurvey(results);
    // results = resultsSurvey;
    setTestValue(true);
    console.log(answersStorage);
    console.log(selected);
  }; // end handle change

  if (id in answersStorage) {
    selected = answersStorage[id];
    testValue = true;
  }

  useEffect(() => {
    // if is a required question, check if all parts answered
    if (
      (props.opts.required === true || props.opts.required === "true") &&
      checkRequiredQuestionsComplete === true &&
      testValue === false
    ) {
      setFormatOptions({ bgColor: "lightpink", border: "3px dashed black" });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, testValue, props.opts.required]);

  console.log(answersStorage);
  console.log(selected);

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => (
      <div key={uuid()}>
        <RadioInput
          value={index}
          checked={selected}
          label={item}
          setter={setSelected}
        />
      </div>
    ));
    return <div>{radioList}</div>;
  };

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));
  const noteText = ReactHtmlParser(decodeHTML(props.opts.note));

  return (
    <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
      <TitleBar>
        <div>{labelText}</div>
      </TitleBar>
      <NoteText>
        <div>{noteText}</div>
      </NoteText>
      <RadioContainer onChange={(e) => handleChange(e)}>
        <RadioItems />
      </RadioContainer>
    </Container>
  );
};

export default SurveyRadioElement;

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
  min-height: 100px;
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

const LabelDiv = styled.div`
  padding-left: 5px;
`;

const InputStyleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const NoteText = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  vertical-align: center;
  margin-top: 5px;
  height: 50px;
  font-size: 16px;
  text-align: center;
  background-color: whitesmoke;
  width: 100%;
  border-radius: 3px;
`;
