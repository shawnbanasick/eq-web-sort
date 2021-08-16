import React, { useState } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import MultiSelect from "react-multi-select-component";

const getOptionsArray = (options) => {
  let array = options.split(";");
  array = array.filter(function (e) {
    return e;
  });
  const objArray = array.map((x) => {
    x.replace(/\s/g, "");
    const tempObj = {};
    tempObj.label = x;
    tempObj.value = x;
    return tempObj;
  });
  return objArray;
};

let localStore = store({
  hasBeenAnswered: false,
});

const SurveyDropdownElement = (props) => {
  let originalOptions = props.opts.options.split(";");
  originalOptions = originalOptions.map((x) => x.trim());

  const [selected, setSelected] = useState([]);
  // required question answer check
  // console.log(hasBeenAnswered);
  const checkRequiredQuestionsComplete = true;
  let bgColor;
  let border;

  if (selected[0] !== undefined) {
    let selected2 = "";
    for (let i = 0; i < selected.length; i++) {
      let label = selected[i].label.trim();
      let id = originalOptions.indexOf(label);
      if (i === 0) {
        selected2 += id + 1;
      } else {
        selected2 += "|" + (id + 1);
      }
    }
    localStore["hasBeenAnswered"] = true;
    console.log(`qNum${props.opts.qNum}-${props.opts.type}`, selected2);
  }

  // required question answered?
  let hasBeenAnswered = localStore.hasBeenAnswered;
  if (checkRequiredQuestionsComplete === true && hasBeenAnswered === false) {
    bgColor = "lightpink";
    border = "2px dashed black";
  } else {
    bgColor = "whitesmoke";
    border = "none";
  }

  return (
    <Container bgColor={bgColor} border={border}>
      <TitleBar>{props.opts.label}</TitleBar>
      <MultiSelect
        className={"multiselect"}
        options={getOptionsArray(props.opts.options)}
        labelledBy="Select"
        onChange={setSelected}
        value={selected}
      />
    </Container>
  );
};

export default view(SurveyDropdownElement);

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1100px;
  min-height: 125px;
  background-color: ${(props) => props.bgColor};
  border: ${(props) => props.border};

  .multiselect {
    font-size: 16px;
    line-height: 1.1em;
  }
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
