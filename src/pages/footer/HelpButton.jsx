import styled from "styled-components";
import React from "react";
import { view } from "@risingstack/react-easy-state";

const langObj = JSON.parse(localStorage.getItem("langObj"));

const handleOnClick = () => {
  console.log("clicked");
};

const HelpButton = () => {
  return (
    <StyledHelpButton onClick={handleOnClick}>
      {langObj.btnHelp}
    </StyledHelpButton>
  );
};
export default view(HelpButton);

const StyledHelpButton = styled.button`
  background: #337ab7;
  border-color: #2e6da4;
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: 150px;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/*

  &:hover {
    opacity: 1;
    box-shadow: inset 0 0 0 4px #666, 0 0 1px transparent;
  }
  */
