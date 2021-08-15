import React from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";

const localStore = store({});

const getOptionsArray = (options) => {
  let array = options.split(";");
  array = array.filter(function (e) {
    return e;
  });
  array.map((x) => (localStore[x] = false));
  return array;
};

const SurveyCheckboxElement = (props) => {
  const optsArray = getOptionsArray(props.opts.options);
  const nameValue = `question${props.opts.qNum}`;

  const handleChange = (e) => {
    let bool = localStore[e.target.value];
    localStore[e.target.value] = !bool;

    let keys = Object.keys(localStore);
    let selected = "";
    for (let i = 0; i < keys.length; i++) {
      if (localStore[keys[i]] === true) {
        selected += i + 1 + "|";
      }
    }
    if (selected.charAt(selected.length - 1) === "|") {
      selected = selected.substr(0, selected.length - 1);
    }
    console.log(`qNum${props.opts.qNum}-${props.opts.type}`, selected);
  };

  const CheckboxItems = () => {
    const radioList = optsArray.map((item, index) => (
      <div key={uuid()}>
        <input
          key={uuid()}
          id={`${item}-${index}`}
          type="checkbox"
          value={item}
          name={nameValue}
        />
        <label key={uuid()} htmlFor={`${item}-${index}`}>
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
