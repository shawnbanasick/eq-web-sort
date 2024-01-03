import React, { useEffect } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

const SurveyInformationElement = (props) => {
  useEffect(() => {
    const resultsSurvey = JSON.parse(localStorage.getItem("resultsSurvey"));
    resultsSurvey[`itemNum${props.opts.itemNum}`] = "info. - na";
    // localStorage.setItem("resultsSurvey", JSON.stringify(resultsSurvey));
  }, [props.opts.itemNum]);

  const infoText = ReactHtmlParser(decodeHTML(props.opts.options));

  return (
    <Container>
      <TitleBar backgroundColor={props.opts.background}>
        <div>{infoText}</div>
      </TitleBar>
    </Container>
  );
};

export default SurveyInformationElement;

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1300px;
  background-color: whitesmoke;
  min-height: 50px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  min-height: 50px;
  font-size: 18px;
  text-align: center;
  background-color: ${(props) => props.backgroundColor || "lightgray"};
  width: 100%;
  border-radius: 3px;
`;
