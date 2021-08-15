import styled from "styled-components";
import React from "react";
import { withRouter } from "react-router";
import { view } from "@risingstack/react-easy-state";

const checkForNavigation = () => {
  console.log("permission?");
};

const LinkButton = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props;
  return (
    <NextButton
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        checkForNavigation();
        onClick && onClick(event);
        history.push(to);
      }}
    />
  );
};
export default view(withRouter(LinkButton));

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
  margin-right: 15px;
`;
