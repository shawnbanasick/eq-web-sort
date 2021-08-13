import React from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import SortGrid from "./SortGrid";
import styled from "styled-components";

const Sort = () => {
  const cardFontSize = getGlobalState("cardFontSize");
  setGlobalState("currentPage", "sort");
  setGlobalState("progressScore", 50);

  return (
    <React.Fragment>
      <SortTitleBar>
        <Disagree>{window.languageXML.disagree}</Disagree>
        <CondOfInst>{window.languageXML.condOfInst}</CondOfInst>
        <Agree>{window.languageXML.agree}</Agree>
      </SortTitleBar>
      <SortGrid cardFontSize={cardFontSize} />;
    </React.Fragment>
  );
};

export default view(Sort);

const SortTitleBar = styled.div`
  width: 99vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  min-height: 30px;
  display: inline-grid;
  grid-template-columns: 15% 1fr 15%;
  /* background-color: #6a9bc3; */
  color: black;
  font-weight: bold;
`;

const CondOfInst = styled.div`
  background-color: black;
  color: white;
  max-width: 80vw;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
`;

const Agree = styled.div`
  font-size: 22px;
  align-self: end;
  justify-self: end;
  padding-bottom: 5px;
`;

const Disagree = styled.div`
  font-size: 22px;
  align-self: end;
  justify-self: start;
  padding-bottom: 5px;
`;
