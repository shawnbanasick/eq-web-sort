import React from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import styled from "styled-components";
import LogInSubmitButton from "./LogInSubmitButton";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

const LogInScreen = () => {
  // setup language
  const langObj = getGlobalState("langObj");
  const ieWarningHeaderText = ReactHtmlParser(
    decodeHTML(langObj.ieWarningHeaderText)
  );
  const ieWarningText = ReactHtmlParser(decodeHTML(langObj.ieWarningText));

  return (
    <Container>
      <div>
        <center>
          <h2>{ieWarningHeaderText}</h2>
          <StyledHr />
        </center>
      </div>
      <div>
        <StyledInputDiv>
          <h3>{ieWarningText}</h3>
        </StyledInputDiv>
      </div>
    </Container>
  );
};

export default view(LogInScreen);

const Container = styled.div`
  //  display: grid;
  //   grid-template-rows: 1fr 1fr 1fr;
  margin-top: 50px;
  width: 50vw;
  padding: 2vw;
  min-height: 250px;
  margin-bottom: 20px;
  border: 2px solid black;
  justify-self: center;
  background-color: lightgoldenrodyellow;
  border-radius: 50px;
`;

const StyledHr = styled.hr`
  margin-top: 5px;
  margin-bottom: 30px;
`;

const StyledInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
`;
