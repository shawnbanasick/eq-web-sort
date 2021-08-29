import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

const getOptionsArray = (options) => {
  let array = options.split(";");
  array = array.filter(function (e) {
    return e;
  });
  array = array.map((x) => x.replace(/\s/g, ""));
  return array;
};

let localStore = store({
  hasBeenAnswered: false,
});

const SurveyRadioElement = (props) => {
  useEffect(() => {
    const results = getGlobalState("results");
    results[`qNum${props.opts.qNum}`] = "no response";
    setGlobalState("results", results);
  }, [props]);

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
          <LabelDiv>{label}</LabelDiv>
        </InputStyleDiv>
      </label>
    );
  };

  // const nameValue = `question${props.opts.qNum}`;

  // const [hasBeenAnswered, setHasBeenAnswered] = useState(false);
  // required question answer check
  // console.log(hasBeenAnswered);
  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );
  let bgColor;
  let border;

  const [selected, setSelected] = useState();

  const setLocalStore = () => {
    localStore.hasBeenAnswered = true;
  };

  const handleChange = (e) => {
    let results = getGlobalState("results");
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");

    // console.log(e.target.value);

    // to set pink coloring
    setLocalStore();

    const id = `qNum${props.opts.qNum}`;
    requiredAnswersObj[id] = "answered";
    setGlobalState("requiredAnswersObj", requiredAnswersObj);

    results[`qNum${props.opts.qNum}`] = +e.target.value + 1;
    setGlobalState("results", results);
    results = getGlobalState("results");
  }; // end handle change

  // required question answered?
  if (
    checkRequiredQuestionsComplete === true &&
    localStore.hasBeenAnswered === false
  ) {
    bgColor = "lightpink";
    border = "2px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => (
      <div key={uuid()}>
        <RadioInput
          // id={`${item}-${index}`}
          // type="radio"
          value={index}
          checked={selected}
          // name={nameValue}
          label={item}
          setter={setSelected}
        />
      </div>
    ));
    return <div>{radioList}</div>;
  };

  return (
    <Container bgColor={bgColor} border={border}>
      <TitleBar>{props.opts.label}</TitleBar>
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
