import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { view, store } from "@risingstack/react-easy-state";
import MultiSelect from "react-multi-select-component";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

const SurveyDropdownElement = (props) => {
  let isRequired = props.opts.required;
  if (isRequired === "true") {
    isRequired = true;
  }

  useEffect(() => {
    const results = getGlobalState("resultsSurvey");
    results[`qNum${props.opts.qNum}`] = "no response";
    setGlobalState("resultsSurvey", results);
  }, [props]);

  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  const getOptionsArray = (options) => {
    let array = options.split(";;;");
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
  const checkRequiredQuestionsComplete = getGlobalState(
    "checkRequiredQuestionsComplete"
  );

  const handleOnChange = (e) => {
    let requiredAnswersObj = getGlobalState("requiredAnswersObj");
    const results = getGlobalState("resultsSurvey");

    const id = `qNum${props.opts.qNum}`;

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
      results[`qNum${props.opts.qNum}`] = selected2;
      setGlobalState("resultsSurvey", results);
    } else {
      requiredAnswersObj[id] = "no response";
      results[`qNum${props.opts.qNum}`] = "no response";
      setGlobalState("resultsSurvey", results);
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

  useEffect(() => {
    if (
      checkRequiredQuestionsComplete === true &&
      isRequired === true &&
      hasBeenAnswered === false
    ) {
      setFormatOptions({
        bgColor: "lightpink",
        border: "3px dashed black",
      });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, hasBeenAnswered, isRequired]);

  const labelText = ReactHtmlParser(decodeHTML(props.opts.label));

  return (
    <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
      <TitleBar>
        <div>{labelText}</div>
      </TitleBar>
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
  min-height: 50px;
  padding: 5px;
  font-size: 18px;
  text-align: center;
  background-color: lightgray;
  width: 100%;
  border-radius: 3px;
`;
