import React, { useEffect } from "react";
import setGlobalState from "../../globalState/setGlobalState";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import getGlobalState from "../../globalState/getGlobalState";

const PleaseLogInFirst = () => {
  useEffect(() => {
    setGlobalState("currentPage", "presort");
  }, []);

  const langObj = getGlobalState("langObj");
  const configObj = getGlobalState("configObj");
  const headerBarColor = configObj.headerBarColor;
  const mainText = decodeHTML(langObj.logInFirst);

  return (
    <React.Fragment>
      <SortTitleBar background={headerBarColor}>
        {langObj.titleBarText}
      </SortTitleBar>
      <ContainerDiv>
        <ContentDiv>{ReactHtmlParser(mainText)}</ContentDiv>
      </ContainerDiv>
    </React.Fragment>
  );
};

export default view(PleaseLogInFirst);

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
