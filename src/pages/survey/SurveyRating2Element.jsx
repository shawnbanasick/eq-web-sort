import React from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";

const getOptionsArray = (options) => {
  let array = options.split(";");
  array = array.filter(function (e) {
    return e;
  });

  console.log(array);
  return array;
};

const getScaleArray = (options) => {
  let array = options.split(";");
  console.log("scale: ", array);
  return array;
};

const SurveyRatings2Element = (props) => {
  console.log(props);
  const optsArray = getOptionsArray(props.opts.options);
  const scaleArray = getScaleArray(props.opts.scale);
  console.log(optsArray);
  console.log(scaleArray);

  //   const nameValue = `question${props.opts.qNum}`;

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => (
      <ItemContainer onChange={handleChange} key={`div-${index}`}>
        <span key={`QL-${index}`}>{item}</span>
        <input
          key={`Q-${index}`}
          id={`Q-${index}`}
          type="radio"
          value={scaleArray[0]}
          name={`${props.opts.qNum}-${index + 1}`}
        />
        <input
          key={`Q2-${index}`}
          id={`Q2-${index}`}
          type="radio"
          value={scaleArray[1]}
          name={`${props.opts.qNum}-${index + 1}`}
        />
      </ItemContainer>
    ));
    return <div>{radioList}</div>;
  };

  return (
    <Container>
      <TitleBar>{props.opts.label}</TitleBar>
      <RadioContainer>
        <RatingTitle>
          <div />
          <span>{scaleArray[0]}</span>
          <span>{scaleArray[1]}</span>
        </RatingTitle>
        <RadioItems />
      </RadioContainer>
    </Container>
  );
};

export default view(SurveyRatings2Element);

const Container = styled.div`
  width: 90vw;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 1100px;
  background-color: whitesmoke;
  min-height: 200px;
`;

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 18px;
  text-align: center;
  background-color: lightgray;
  width: 100%;
  border-radius: 3px;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  padding: 20px;
  vertical-align: center;
  margin-top: 5px;
  height: auto;
  min-height: 50px;
  font-size: 16px;
  background-color: white;
  width: 100%;
  border-radius: 3px;
  border: 2px solid lightgray;

  input {
    margin-top: 8px;
  }

  label {
    margin-left: 8px;
  }
`;

const ItemContainer = styled.div`
  display: inline-grid;
  grid-template-columns: 750px 100px 100px 150px;
  margin-bottom: 7px;
  padding-left: 5px;
`;

const RatingTitle = styled.div`
  display: inline-grid;
  grid-template-columns: 750px 100px 100px 150px;
  margin-bottom: 7px;
`;
