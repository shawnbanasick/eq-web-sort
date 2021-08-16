import React, { useState } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";

const localStore = store({});

const localStore2 = store({
  hasBeenAnswered: false,
});

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
  // required question answer check
  // console.log(hasBeenAnswered);
  const checkRequiredQuestionsComplete = true;
  let bgColor;
  let border;

  // console.log("test", JSON.parse("true"), JSON.parse("false"));

  const [checkedState, setCheckedState] = useState(
    new Array(optsArray.length).fill(false)
  );

  // const [isChecked, setIsChecked] = useState(false);

  const handleChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    console.log(position);

    const results = updatedCheckedState.reduce(
      (text = "", currentState, index) => {
        if (currentState === true) {
          return text + (index + 1).toString() + "|";
        }
        return text;
      },
      0
    );

    console.log(results);
    // localStore2["hasBeenAnswered"] = true;

    // let bool = localStore[e.target.value];
    // localStore[e.target.value] = !bool;

    // let keys = Object.keys(localStore);
    // let selected = "";
    // for (let i = 0; i < keys.length; i++) {
    //   if (localStore[keys[i]] === true) {
    //     selected += i + 1 + "|";
    //   }
    // }
    // if (selected.charAt(selected.length - 1) === "|") {
    //   selected = selected.substr(0, selected.length - 1);
    // }
    // console.log(`qNum${props.opts.qNum}-${props.opts.type}`, selected);
  };

  // required question answered?
  let hasBeenAnswered = localStore2.hasBeenAnswered;
  if (checkRequiredQuestionsComplete === true && hasBeenAnswered === false) {
    bgColor = "lightpink";
    border = "2px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  const CheckboxItems = () => {
    const radioList = optsArray.map((item, index) => (
      <div key={uuid()}>
        <input
          key={uuid()}
          id={`${item}-${index}`}
          type="checkbox"
          value={item}
          name={nameValue}
          checked={checkedState[index]}
          onChange={() => handleChange(index)}
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
      <RadioContainer>
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
  min-height: 150px;
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
