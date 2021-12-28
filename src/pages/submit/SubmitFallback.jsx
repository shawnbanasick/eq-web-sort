import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import FallbackButtons from "./FallbackButtons";
import useSettingsStore from "../../globalState/useSettingsStore";

// eslint-disable-next-line react/button-has-type
/* eslint react/prop-types: 0 */

/* const handleClick = () => {
  console.log("clicked");
}; */

const SubmitFallback = (props) => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);

  const fallbackMessage = ReactHtmlParser(decodeHTML(langObj.fallbackMessage));

  return (
    <div>
      <StyledMessage>{fallbackMessage}</StyledMessage>
      <FallbackButtons results={props.results} />
    </div>
  );
};

export default view(SubmitFallback);

const StyledMessage = styled.div`
  width: 50vw;
  max-width: 900px;
  font-size: 3vh;
  background-color: orange;
  padding: 10px;
  border-radius: 5px;
`;
