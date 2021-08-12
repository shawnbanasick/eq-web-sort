import React from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";

const localStore = store({});

const getOptionsArray = (options) => {
  let array = options.split(";");
  array = array.filter(function (e) {
    return e;
  });

  array = array.map((x) => x.replace(/\s/g, ""));

  array.map((x) => (localStore[x] = false));
  console.log(array);

  return array;
};

console.log(localStore);

const SurveyCheckboxElement = (props) => {
  const optsArray = getOptionsArray(props.opts.options);
  console.log(optsArray);
  const nameValue = `question${props.opts.qNum}`;

  const handleChange = (e) => {
    let bool = localStore[e.target.value];
    localStore[e.target.value] = !bool;
    console.log(props.opts.qNum, e.target.value);
    console.log(localStore);
  };

  const CheckboxItems = () => {
    const radioList = optsArray.map((item, index) => (
      <div key={`div-${index}`}>
        <input
          key={index}
          id={`${item}-${index}`}
          type="checkbox"
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
        <CheckboxItems />
      </RadioContainer>
    </Container>
  );
};

export default view(SurveyCheckboxElement);

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1100px;
  background-color: whitesmoke;
  min-height: 150px;
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
  min-height: 120px;
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
