import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MultiSelect from "react-multi-select-component";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useStore from "../../globalState/useStore";

const getResults = (state) => state.resultsSurvey;
const getSetResultsSurvey = (state) => state.setResultsSurvey;
const getCheckReqQsComplete = (state) => state.checkRequiredQuestionsComplete;
const getRequiredAnswersObj = (state) => state.requiredAnswersObj;
const getSetRequiredAnswersObj = (state) => state.setRequiredAnswersObj;
const getAnswersStorage = (state) => state.answersStorage;
const getSetAnswersStorage = (state) => state.setAnswersStorage;

const SurveyDropdownElement = (props) => {
  // STATE
  const results = useStore(getResults);
  const setResultsSurvey = useStore(getSetResultsSurvey);
  const checkRequiredQuestionsComplete = useStore(getCheckReqQsComplete);
  const requiredAnswersObj = useStore(getRequiredAnswersObj);
  const setRequiredAnswersObj = useStore(getSetRequiredAnswersObj);
  const answersStorage = useStore(getAnswersStorage);
  const setAnswersStorage = useStore(getSetAnswersStorage);

  useEffect(() => {
    results[`qNum${props.opts.qNum}`] = "no response";
    setResultsSurvey(results);
  }, [props, results, setResultsSurvey]);

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

  let originalOptions = props.opts.options.split(";;;");
  originalOptions = originalOptions.map((x) => x.trim());

  let localStore = {
    hasBeenAnswered: false,
  };

  let [selected, setSelected] = useState([]);

  const id = `qNum${props.opts.qNum}`;

  // HANDLE ON CHANGE
  const handleOnChange = (e) => {
    setSelected(e);
    answersStorage[id] = e;
    setAnswersStorage(answersStorage);

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
      setResultsSurvey(results);
    } else {
      requiredAnswersObj[id] = "no response";
      results[`qNum${props.opts.qNum}`] = "no response";
      setResultsSurvey(results);
    }
    setRequiredAnswersObj(requiredAnswersObj);
  };

  if (selected.length > 0) {
    localStore["hasBeenAnswered"] = true;
  } else {
    localStore["hasBeenAnswered"] = false;
  }

  // required question answered?
  let hasBeenAnswered = localStore.hasBeenAnswered;

  // check if response in global state and inject into results
  if (id in answersStorage) {
    let response = answersStorage[id];
    selected = response;
    hasBeenAnswered = true;

    requiredAnswersObj[id] = "answered";
    let selected2 = "";
    for (let i = 0; i < response.length; i++) {
      let label = response[i].label;
      let id = originalOptions.indexOf(label);
      if (i === 0) {
        selected2 += id + 1;
      } else {
        selected2 += "|" + (id + 1);
      }
    }
    results[`qNum${props.opts.qNum}`] = selected2;
    setResultsSurvey(results);
  }

  useEffect(() => {
    if (
      (props.opts.required === true || props.opts.required === "true") &&
      checkRequiredQuestionsComplete === true &&
      hasBeenAnswered === false
    ) {
      setFormatOptions({
        bgColor: "#fde047",
        border: "3px dashed black",
      });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, hasBeenAnswered, props.opts.required]);

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

export default SurveyDropdownElement;

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 125px;
  background-color: ${(props) => props.bgColor};
  outline: ${(props) => props.border};
  outline-offset: -3px;

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
