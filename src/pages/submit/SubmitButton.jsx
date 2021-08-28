import React from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
// import globalState from "../../globalState/globalState";

const SubmitResultsButton = () => {
  const langObj = getGlobalState("langObj");
  // console.log(results);
  // let configObj = getGlobalState("configObj");

  const handleClick = (e) => {
    let results = getGlobalState("results");
    e.preventDefault();
    console.log(JSON.stringify(results, null, 2));
    // console.log("please help me");
    // console.log(langObj);
  };

  return (
    <StyledButton tabindex="0" onClick={handleClick}>
      {langObj.btnTransfer}
    </StyledButton>
  );
};
export default view(SubmitResultsButton);

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
