import React from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import { v4 as uuid } from "uuid";
// import setGlobalState from "../../globalState/setGlobalState";

const SortColGuides = (props) => {
  const configObj = getGlobalState("configObj");
  const qSortHeaderNumbers = [...configObj.qSortHeaderNumbers];
  const columnHeadersColorsArray = [...configObj.columnHeadersColorsArray];
  let columnWidth = +props.columnWidth + 11;

  return (
    <ColorBarDivContainer id="colorBarDivContainer">
      {qSortHeaderNumbers.map((value, index) => {
        return (
          <ColorBarDiv
            key={uuid()}
            width={columnWidth}
            color={columnHeadersColorsArray[index]}
          >
            {value}
          </ColorBarDiv>
        );
      })}
    </ColorBarDivContainer>
  );
};

export default view(SortColGuides);

const ColorBarDiv = styled.div`
  background-color: ${(props) => props.color};
  width: ${(props) => +props.width}px;
  margin-right: 1px;
  margin-left: 1px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  height: 28px;
  border-bottom: 2px solid black;
`;

const ColorBarDivContainer = styled.div`
  display: flex;
  padding-left: 2px;
  flex-direction: row;
  background-color: #d8d8d8;
  margin-bottom: 0px;
  height: 30px;
`;
