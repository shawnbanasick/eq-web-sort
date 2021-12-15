import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

const SurveyRadioElement = (props) => {
  let isRequired = props.opts.required;
  if (isRequired === "true") {
    isRequired = true;
  }

  // local state for required question warning
  const [testValue, setTestValue] = useState(false);
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  useEffect(() => {
    const results = getGlobalState("resultsSurvey");
    results[`qNum${props.opts.qNum}`] = "no response";
    setGlobalState("resultsSurvey", results);
  }, [props]);

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

  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );

  const [selected, setSelected] = useState();

  const handleChange = (e) => {
    let results = getGlobalState("resultsSurvey");
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");

    const id = `qNum${props.opts.qNum}`;
    requiredAnswersObj[id] = "answered";
    setGlobalState("requiredAnswersObj", requiredAnswersObj);

    results[`qNum${props.opts.qNum}`] = +e.target.value + 1;
    setGlobalState("resultsSurvey", results);
    results = getGlobalState("resultsSurvey");
    setTestValue(true);
  }; // end handle change

  useEffect(() => {
    // if is a required question, check if all parts answered
    if (
      checkRequiredQuestionsComplete === true &&
      testValue === false &&
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

export default view(SurveyRadioElement);

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
