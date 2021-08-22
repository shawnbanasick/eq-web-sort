import styled from "styled-components";
import React from "react";
import { view } from "@risingstack/react-easy-state";

const langObj = JSON.parse(localStorage.getItem("langObj"));

// const handleOnClick = () => {
//   console.log("clicked");
// };

const LogInSubmitButton = (props) => {
  return (
    <StyledSubmitButton onClick={props.onClick}>
      {langObj.loginSubmitButtonText}
    </StyledSubmitButton>
  );
};
export default view(LogInSubmitButton);

const StyledSubmitButton = styled.button`
  background: #337ab7;
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
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
