import React, { useEffect } from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import SortGrid from "./SortGrid";
import styled from "styled-components";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";

let startTime;

const Sort = () => {
  const cardFontSize = getGlobalState("cardFontSize");
  const langObj = JSON.parse(localStorage.getItem("langObj"));

  useEffect(() => {
    setTimeout(() => {
      setGlobalState("currentPage", "sort");
    }, 200);
  });

  // calc time on page
  useEffect(() => {
    startTime = Date.now();
    return () => {
      calculateTimeOnPage(startTime, "sortPage", "SortPage");
    };
  }, []);

  return (
    <HeaderContainer>
      <SortTitleBar>
        <Disagree>{langObj.sortDisagreement}</Disagree>
        <CondOfInst>{langObj.condOfInst}</CondOfInst>
        <Agree>{langObj.sortAgreement}</Agree>
      </SortTitleBar>
      <SortGrid cardFontSize={cardFontSize} />;
    </HeaderContainer>
  );
};

export default view(Sort);

const SortTitleBar = styled.div`
  width: 98vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-bottom: 5px;
  min-height: 50px;
  display: inline-grid;
  grid-template-columns: 15% 1fr 15%;
  color: black;
  font-weight: bold;
`;

const CondOfInst = styled.div`
  color: white;
  max-width: 80vw;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  align-self: end;
`;

const Agree = styled.div`
  font-size: 22px;
  align-self: end;
  justify-self: end;
  color: white;
  padding-bottom: 5px;
`;

const Disagree = styled.div`
  font-size: 22px;
  align-self: end;
  justify-self: start;
  color: white;
  padding-bottom: 5px;
`;

const HeaderContainer = styled.div`
  padding-bottom: 100px;
  background-color: black;
`;
