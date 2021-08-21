import styled from "styled-components";
import React from "react";
import { view } from "@risingstack/react-easy-state";

// const checkForNavigation = () => {
//   console.log("permission?");
// };

const HelpButton = () => {
  return <NextButton>Help</NextButton>;
};
export default view(HelpButton);

const NextButton = styled.button`
  background: #337ab7;
  border-color: #2e6da4;
  color: white;
  font-size: 0.8em;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: 100px;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
