import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useLocalStorage from "../../utilities/useLocalStorage";

const SurveyLikertElement = (props) => {
  // PROPS
  const checkRequiredQuestionsComplete = props.check;
  // gives the number of questions
  const questionId = `qNum${props.opts.qNum}`;
  const labelText = ReactHtmlParser(decodeHTML(props.opts.label)) || "";

  // PERSISTENT STATE
  let [selected, setSelected] = useLocalStorage(questionId, "");

  // LOCAL STATE
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  // ****** GET SCALE ARRAY *******

  const getScaleArray = (options) => {
    let array = options.split(";;;");
    return array;
  };
  const scaleArray = getScaleArray(props.opts.scale);

  // ****** ON CHANGE  *******
  const handleChange = (e) => {
    const resultsSurvey = JSON.parse(localStorage.getItem("resultsSurvey"));
    resultsSurvey[`qNum${props.opts.qNum}`] = +e.target.value + 1;
    localStorage.setItem("resultsSurvey", JSON.stringify(resultsSurvey));
  }; // end handleChange

  // ****** CHECK IF ALL PARTS ANSWERED on render *******
  let setYellow = false;
  if (selected.length === 0) {
    setYellow = true;
  }

  useEffect(() => {
    // if is a required question, check if all parts answered
    if (
      (props.opts.required === true || props.opts.required === "true") &&
      checkRequiredQuestionsComplete === true &&
      setYellow
    ) {
      setFormatOptions({
        bgColor: "rgba(253, 224, 71, .5)",
        border: "3px dashed black",
      });
    } else {
      setFormatOptions({
        bgColor: "whitesmoke",
        border: "none",
      });
    }
  }, [checkRequiredQuestionsComplete, setYellow, props.opts.required]);

  const scaleList = scaleArray.map((item) => {
    return (
      <ScaleDiv key={uuid()}>
        <div>{ReactHtmlParser(decodeHTML(item))}</div>
      </ScaleDiv>
    );
  });

  // template
  const RadioInput = ({ value, checked, setter }) => {
    return (
      <>
        <input
          type="radio"
          checked={checked === value}
          onChange={() => setter(value)}
          value={value}
        />
      </>
    );
  };

  const RadioItems = () => {
    const radioList = scaleArray.map((item, index) => (
      <RadioButtons key={uuid()} onChange={(e) => handleChange(e)}>
        <RadioInput value={index} checked={selected} setter={setSelected} />
      </RadioButtons>
    ));
    return <ItemContainer cols={scaleArray.length}>{radioList}</ItemContainer>;
  };

  return (
    <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
      <TitleBar>
        <div>{labelText}</div>
      </TitleBar>
      <RadioContainer>
        <RatingTitle cols={scaleArray.length}>{scaleList}</RatingTitle>
        <RadioItems />
      </RadioContainer>
    </Container>
  );
};

export default SurveyLikertElement;

const Container = styled.div`
  width: 90vw;
  padding: 12px 20px 0px 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 170px;
  background-color: ${(props) => props.bgColor};
  outline: ${(props) => props.border};
  outline-offset: -3px;
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

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 10px 20px 0px 20px;
  vertical-align: center;
  margin-top: 0px;
  height: auto;
  min-height: 50px;
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

const ItemContainer = styled.div`
  display: inline-grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.cols}, ${100 / props.cols}%)`};
  margin-bottom: 17px;
  padding-left: 5px;
  padding-bottom: 8px;
  height: 40px;
  width: 100%;

  align-items: end;
  background-color: ${(props) => (props.indexVal % 2 ? "white" : "#ececec")};
`;

const RatingTitle = styled.div`
  display: inline-grid;
  grid-template-columns: ${(props) =>
    `repeat(${props.cols}, ${100 / props.cols}%)`};
  margin-bottom: 7px;
`;

const ScaleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const RadioButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  input {
    height: 1.4em;
    width: 100%;
  }
`;
