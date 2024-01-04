import React, { useState } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";

const getLangObj = (state) => state.langObj;

const CopyToClipboardButton = (props) => {
  console.log("incoming: " + JSON.stringify(props.content));

  // GLOBAL STATE
  const langObj = useSettingsStore(getLangObj);
  const copiedText = ReactHtmlParser(decodeHTML(langObj.copiedText)) || "";
  const copyTextError =
    ReactHtmlParser(decodeHTML(langObj.copyTextError)) || "";

  // LOCAL STATE
  const [result, setResult] = useState("");

  // async generic function for copying to clipboard
  async function copyToClipboard() {
    try {
      let formattedResultsTxt = "";
      if (props.type === "results") {
        for (const [key, value] of Object.entries(props.content)) {
          formattedResultsTxt = formattedResultsTxt + `${key}: ${value} * `;
        }
      } else {
        formattedResultsTxt = props.content;
      }
      console.log("formattedResults: " + formattedResultsTxt);

      await navigator.clipboard.writeText(formattedResultsTxt);
      setResult("success");
    } catch (err) {
      setResult("error");
      console.error("Failed to copy: ", err);
    } finally {
      setTimeout(() => setResult(""), 3000);
    }
  }

  const handleClick = (e) => {
    copyToClipboard(props.content).then(() => {
      console.log("copied to clipboard");
    });
  };

  return (
    <React.Fragment>
      <ContainerDiv>
        <StyledButton tabindex="1" onClick={(e) => handleClick(e)}>
          {props.text}
        </StyledButton>
        <MessageDiv>
          {result === "success" && copiedText}
          {result === "error" && copyTextError}
        </MessageDiv>
      </ContainerDiv>
    </React.Fragment>
  );
};

export default CopyToClipboardButton;

const StyledButton = styled.button`
  grid-area: b;
  border-color: #2e6da4;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  min-width: 200px;
  height: 50px;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.primary};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const ContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  grid-template-areas: "a b c";
`;

const MessageDiv = styled.div`
  grid-area: c;
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 0.7em;
`;
