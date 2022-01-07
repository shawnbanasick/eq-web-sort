import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";

const getLangObj = (state) => state.langObj;

const LogInScreen = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);

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

export default LogInScreen;

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
