import React from "react";
import { LoopCircleLoading } from "react-loadingg";
import styled from "styled-components";

const LoadingScreen = () => {
  return (
    <Container>
      <TextDiv>Loading</TextDiv>
      <div>
        <LoopCircleLoading
          size="large"
          style={{ height: "50px", width: "50px" }}
          color="#337ab7"
        />
      </div>
    </Container>
  );
};

export default LoadingScreen;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 700px;
  justify-content: center;
  align-items: center;
`;

const TextDiv = styled.div`
  font-size: 88px;
  font-style: italic;
  font-weight: bold;
  align-self: center;
  margin-right: 70px;
  margin-top: 40px;
`;
