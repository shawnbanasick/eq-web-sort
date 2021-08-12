import React, { useState } from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
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

  console.log(objArray);

  return objArray;
};

const SurveyDropdownElement = (props) => {
  const handleChange = (e) => {
    console.log(e);
    // console.log(props.opts.qNum, e.target.value);
  };

  const [selected, setSelected] = useState([]);

  return (
    <Container>
      <TitleBar>{props.opts.label}</TitleBar>
      <MultiSelect
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
  max-width: 900px;
  background-color: whitesmoke;
  min-height: 200px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 22px;
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
  min-height: 150px;
  font-size: 18px;
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
