import React, { useEffect } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useStore from "../../globalState/useStore";

const getResults = (state) => state.resultsSurvey;
const getSetResultsSurvey = (state) => state.setResultsSurvey;

const SurveyInformationElement = (props) => {
  // STATE
  const results = useStore(getResults);
  const setResultsSurvey = useStore(getSetResultsSurvey);

  useEffect(() => {
    results[`qNum${props.opts.qNum}`] = "info. - na";
    setResultsSurvey(results);
  }, [props, results, setResultsSurvey]);

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
