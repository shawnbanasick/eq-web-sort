import styled from "styled-components";
import React from "react";
import { view } from "@risingstack/react-easy-state";

const langObj = JSON.parse(localStorage.getItem("langObj"));

const SubmitButton = () => {
  return <StyledButton>{langObj.btnTransfer}</StyledButton>;
};
export default view(SubmitButton);

const StyledButton = styled.button`
  background: #337ab7;
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
`;
