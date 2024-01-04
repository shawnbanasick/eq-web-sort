import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import { v4 as uuid } from "uuid";
import useSettingsStore from "../../globalState/useSettingsStore";

const getLangObj = (state) => state.langObj;

const SubmitResultsButton = (props) => {
  // STATE
  const langObj = useSettingsStore(getLangObj);

  const downloadButtonText =
    ReactHtmlParser(decodeHTML(langObj.btnDownload)) || "";
  const randomId = uuid().substring(0, 12);

  const resultsWithId = {};
  resultsWithId[randomId] = props.results;

  const finalResults = JSON.stringify(resultsWithId);

  const handleClick = (e) => {
    function download(content, fileName, contentType) {
      var a = document.createElement("a");
      var file = new Blob([content], { type: contentType });
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(a.href);
    }

    download(finalResults, "EQ_Web_Sort_Results.txt", "text/plain");
  };

  return (
    <ButtonContainer>
      <StyledButton tabindex="0" onClick={(e) => handleClick(e)}>
        {downloadButtonText}
      </StyledButton>
    </ButtonContainer>
  );
};
export default SubmitResultsButton;

const StyledButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: 200px;
  height: 50px;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;

  margin-top: 30px;
  margin-bottom: 20px;
  background-color: ${({ theme, active }) =>
    active ? theme.secondary : theme.primary};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.focus};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 50vw;
  justify-content: center;
  align-items: center;
`;
