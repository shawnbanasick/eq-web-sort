import styled from "styled-components";
import React from "react";
import { view } from "@risingstack/react-easy-state";

const langObj = JSON.parse(localStorage.getItem("langObj"));

const LogInSubmitButton = (props) => {
  return (
    <StyledSubmitButton tabindex="0" onClick={props.onClick}>
      {langObj.loginSubmitButtonText}
    </StyledSubmitButton>
  );
};
export default view(LogInSubmitButton);

const StyledSubmitButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: 200px;
  height: 50px;
  justify-self: right;
  align-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, active }) =>
    active ? theme.secondary : theme.primary};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.focus};
  }
`;
