import React from "react";
// import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import SubmitButton from "./SubmitButton";
import getGlobalState from "../../globalState/getGlobalState";

const SubmitPage = () => {
  // language options
  const langObj = getGlobalState("langObj");
  const transferTextAbove = decodeHTML(langObj.transferTextAbove);
  const transferTextBelow = decodeHTML(langObj.transferTextBelow);

  // config options
  const configObj = getGlobalState("configObj");
  const headerBarColor = configObj.headerBarColor;

  setTimeout(function () {
    setGlobalState("currentPage", "submit");
  }, 100);

  return (
    <React.Fragment>
      <SortTitleBar background={headerBarColor}>
        {langObj.transferHead}
      </SortTitleBar>
      <ContainerDiv>
        <ContentDiv>{ReactHtmlParser(transferTextAbove)}</ContentDiv>
        <SubmitButton />
        <ContentDiv>{ReactHtmlParser(transferTextBelow)}</ContentDiv>
      </ContainerDiv>
      {/* <h1>test</h1> */}
    </React.Fragment>
  );
};

export default view(SubmitPage);

const SortTitleBar = styled.div`
  width: calc(100vw-4px);
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 5px;
  min-height: 50px;
  background-color: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
`;

const ContainerDiv = styled.div`
  display: flex;
  min-height: 800px;
  width: calc(100vw-4px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2em;
  width: 85vw;
  font-size: 1.35em;
  padding: 25px;
  align-self: center;
`;
