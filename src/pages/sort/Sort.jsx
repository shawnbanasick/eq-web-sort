import React, { useEffect, useState } from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import SortGrid from "./SortGrid";
import styled from "styled-components";

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const Sort = () => {
  const cardFontSize = getGlobalState("cardFontSize");
  const langObj = JSON.parse(localStorage.getItem("langObj"));

  // state
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    setTimeout(() => {
      setGlobalState("currentPage", "sort");
    }, 200);

    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setGlobalState("currentPage", "sort");
  //   }, 200);
  // }, []);

  return (
    <HeaderContainer>
      <SortTitleBar>
        <Disagree>{langObj.btnDisagreement}</Disagree>
        <CondOfInst>{langObj.condOfInst}</CondOfInst>
        <Agree>{langObj.btnAgreement}</Agree>
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
  min-height: 30px;
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
  background-color: black;
`;
