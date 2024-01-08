import React, { useEffect } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getSetCurrentPage = (state) => state.setCurrentPage;

const PresortIsComplete = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const setCurrentPage = useStore(getSetCurrentPage);

  const headerBarColor = configObj.headerBarColor;
  const mainText =
    ReactHtmlParser(decodeHTML(langObj.stepCompleteMessage)) || "";
  const titleBarText = ReactHtmlParser(decodeHTML(langObj.titleBarText)) || "";

  useEffect(() => {
    setCurrentPage("presort");
  }, [setCurrentPage]);

  return (
    <React.Fragment>
      <SortTitleBar background={headerBarColor}>{titleBarText}</SortTitleBar>
      <ContainerDiv>
        <ContentDiv>{mainText}</ContentDiv>
      </ContainerDiv>
    </React.Fragment>
  );
};

export default PresortIsComplete;

const SortTitleBar = styled.div`
  width: calc(100vw-4px);
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 5px;
  min-height: 50px;
  background-color: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
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
