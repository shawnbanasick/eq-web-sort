import React, { useState } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import MultiSelect from "react-multi-select-component";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

const SurveyDropdownElement = (props) => {
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

  let originalOptions = props.opts.options.split(";");
  originalOptions = originalOptions.map((x) => x.trim());

  let localStore = store({
    hasBeenAnswered: false,
  });

  const [selected, setSelected] = useState([]);
  // required question answer check
  // console.log(hasBeenAnswered);
  // required question answer check
  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );
  let bgColor;
  let border;

  const handleOnChange = (e) => {
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");
    const results = getGlobalState("results");

    const id = `qNum${props.opts.qNum}`;

    // console.log(JSON.stringify(e));
    setSelected(e);

    if (e.length !== 0) {
      requiredAnswersObj[id] = "answered";
      let selected2 = "";
      for (let i = 0; i < e.length; i++) {
        let label = e[i].label;
        let id = originalOptions.indexOf(label);
        if (i === 0) {
          selected2 += id + 1;
        } else {
          selected2 += "|" + (id + 1);
        }
      }
      // console.log(`qNum${props.opts.qNum}-${props.opts.type}`, selected2);
      results[`qNum${props.opts.qNum}-${props.opts.type}`] = selected2;
      setGlobalState("results", results);
    } else {
      requiredAnswersObj[id] = "no response";
      // console.log("no response");
      results[`qNum${props.opts.qNum}-${props.opts.type}`] = "no response";
      setGlobalState("results", results);
    }
    setGlobalState("requiredAnswersObj", requiredAnswersObj);
  };

  if (selected.length > 0) {
    localStore["hasBeenAnswered"] = true;
  } else {
    localStore["hasBeenAnswered"] = false;
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
        onChange={handleOnChange}
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
  max-width: 1300px;
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
