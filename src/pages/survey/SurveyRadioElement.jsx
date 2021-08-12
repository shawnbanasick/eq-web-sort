import React from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";

const getOptionsArray = (options) => {
  let array = options.split(";");
  array = array.filter(function (e) {
    return e;
  });

  array = array.map((x) => x.replace(/\s/g, ""));

  console.log(array);
  return array;
};

const SurveyRadioElement = (props) => {
  const optsArray = getOptionsArray(props.opts.options);
  console.log(optsArray);
  const nameValue = `question${props.opts.qNum}`;

  const handleChange = (e) => {
    console.log(props.opts.qNum, e.target.value);
  };

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => (
      <div key={`div-${index}`}>
        <input
          key={index}
          id={`${item}-${index}`}
          type="radio"
          value={item}
          name={nameValue}
        />
        <label key={`Q-${index}`} htmlFor={`${item}-${index}`}>
          {item}
        </label>
      </div>
    ));
    return <div>{radioList}</div>;
  };

  return (
    <Container>
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
  background-color: whitesmoke;
  min-height: 200px;
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
