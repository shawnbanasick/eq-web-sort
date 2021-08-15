import React from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import { v4 as uuid } from "uuid";

const getOptionsArray = (options) => {
  let array = options.split(";");
  array = array.filter(function (e) {
    return e;
  });
  return array;
};

const SurveyRatings2Element = (props) => {
  const optsArray = getOptionsArray(props.opts.options);

  //   const nameValue = `question${props.opts.qNum}`;

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  const RadioItems = () => {
    const radioList = optsArray.map((item, index) => (
      <ItemContainer onChange={handleChange} key={`div-${index}`}>
        <span key={`QL-${index}`}>{item}</span>
        <input
          key={uuid()}
          id={`Q-${index}`}
          type="radio"
          value={1}
          name={`${props.opts.qNum}-${index + 1}`}
        />
        <input
          key={uuid()}
          id={`Q2-${index}`}
          type="radio"
          value={2}
          name={`${props.opts.qNum}-${index + 1}`}
        />
        <input
          key={uuid()}
          id={`Q3-${index}`}
          type="radio"
          value={3}
          name={`${props.opts.qNum}-${index + 1}`}
        />
        <input
          key={uuid()}
          id={`Q4-${index}`}
          type="radio"
          value={4}
          name={`${props.opts.qNum}-${index + 1}`}
        />
        <input
          key={uuid()}
          id={`Q5-${index}`}
          type="radio"
          value={5}
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
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
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
  font-size: 18px;
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
  grid-template-columns: 700px 50px 50px 50px 50px 50px 50px;
  margin-bottom: 7px;
  font-size: 16px;
`;

const RatingTitle = styled.div`
  display: inline-grid;
  grid-template-columns: 700px 50px 50px 50px 50px 50px 50px;
  margin-bottom: 7px;
`;
