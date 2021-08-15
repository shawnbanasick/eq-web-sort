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
  return objArray;
};

const SurveyDropdownElement = (props) => {
  const [selected, setSelected] = useState([]);

  if (selected[0] !== undefined) {
    console.log(`qNum${props.opts.qNum}-${props.opts.type}`);

    let selected2 = "";
    for (let i = 0; i < selected.length; i++) {
      if (i === selected.length - 1) {
        selected2 += selected[i].value.trim();
      } else {
        selected2 += selected[i].value.trim() + "|";
      }
    }

    console.log(JSON.stringify(selected2));
  }

  return (
    <Container>
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
  background-color: whitesmoke;
  min-height: 125px;

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
