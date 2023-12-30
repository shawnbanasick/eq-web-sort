import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useLocalStorage from "../../utilities/useLocalStorage";

const SurveyRadioElement = (props) => {
  // HELPER FUNCTION
  const getOptionsArray = (options) => {
    let array = options.split(";;;");
    array = array.filter(function (e) {
      return e;
    });
    array = array.map((x) => x.trim());
    return array;
  };

  // PROPS
  let questionId = props.opts.id;
  const checkRequiredQuestionsComplete = props.check;
  const labelText = ReactHtmlParser(decodeHTML(props.opts.label)) || "";
  const noteText = ReactHtmlParser(decodeHTML(props.opts.note)) || "";
  const optsArray = getOptionsArray(props.opts.options);
  let displayNoteText = true;
  if (noteText.length < 1 || noteText === "") {
    displayNoteText = false;
  }

  // PERSISTENT STATE
  let [selected, setSelected] = useLocalStorage(questionId, "");

  // LOCAL STATE
  const [formatOptions, setFormatOptions] = useState({
    bgColor: "whitesmoke",
    border: "none",
  });

  // template
  const RadioInput = ({ label, value, checked, setter }) => {
    return (
      <label>
        <InputStyleDiv>
          <input
            type="radio"
            checked={checked === value}
            onChange={() => setter(value)}
            value={value}
          />
          <LabelDiv>
            <div>{label}</div>
          </LabelDiv>
        </InputStyleDiv>
      </label>
    );
  };

  const handleChange = (e) => {
    const resultsSurvey = JSON.parse(localStorage.getItem("resultsSurvey"));
    resultsSurvey[`qNum${props.opts.qNum}`] = +e.target.value + 1;
    localStorage.setItem("resultsSurvey", JSON.stringify(resultsSurvey));
  }; // end handle change

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

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => (
      <div key={uuid()}>
        <RadioInput
          value={index}
          checked={selected}
          label={item}
          setter={setSelected}
        />
      </div>
    ));
    return <div>{radioList}</div>;
  };

  if (displayNoteText) {
    return (
      <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
        <TitleBar>
          <div>{labelText}</div>
        </TitleBar>
        <NoteText>
          <div>{noteText}</div>
        </NoteText>
        <RadioContainer onChange={(e) => handleChange(e)}>
          <RadioItems />
        </RadioContainer>
      </Container>
    );
  } else {
    return (
      <Container bgColor={formatOptions.bgColor} border={formatOptions.border}>
        <TitleBar>
          <div>{labelText}</div>
        </TitleBar>
        <RadioContainer onChange={(e) => handleChange(e)}>
          <RadioItems />
        </RadioContainer>
      </Container>
    );
  }
};

export default SurveyRadioElement;

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  min-height: 200px;
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
  padding: 0px 20px 20px 20px;
  vertical-align: center;
  margin-top: 0px;
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

const LabelDiv = styled.div`
  padding-left: 5px;
`;

const InputStyleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const NoteText = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  vertical-align: center;
  margin-top: 5px;
  height: 50px;
  font-size: 16px;
  text-align: center;
  background-color: whitesmoke;
  width: 100%;
  border-radius: 3px;
`;
