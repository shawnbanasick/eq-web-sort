import React from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";
// import getGlobalState from "../../globalState/getGlobalState";
// import setGlobalState from "../../globalState/setGlobalState";

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
  const optsArray = getOptionsArray(props.opts.options);
  const nameValue = `question${props.opts.qNum}`;

  // required question answer check
  // console.log(hasBeenAnswered);
  const checkRequiredQuestionsComplete = true;
  let bgColor;
  let border;

  const handleChange = (e) => {
    localStore["hasBeenAnswered"] = true;
    console.log(
      `qNum${props.opts.qNum}-${props.opts.type}`,
      optsArray.indexOf(e.target.value) + 1
    );
  };

  // required question answered?
  let hasBeenAnswered = localStore.hasBeenAnswered;
  if (checkRequiredQuestionsComplete === true && hasBeenAnswered === false) {
    bgColor = "lightpink";
    border = "2px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => (
      <div key={uuid()}>
        <input
          key={uuid()}
          id={`${item}-${index}`}
          type="radio"
          value={item}
          name={nameValue}
          defaultChecked={false}
        />
        <label key={uuid()} htmlFor={`${item}-${index}`}>
          {item}
        </label>
      </div>
    ));
    return <div>{radioList}</div>;
  };

  return (
    <Container bgColor={bgColor} border={border}>
      <TitleBar>{props.opts.label}</TitleBar>
      <RadioContainer onChange={handleChange}>
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
