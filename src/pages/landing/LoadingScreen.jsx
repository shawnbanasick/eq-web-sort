import React from "react";
import styled from "styled-components";

const LoadingScreen = () => {
  return (
    <Container>
      <TextDiv>Loading</TextDiv>
      <div>
        <div id="loading" />
      </div>
    </Container>
  );
};

export default LoadingScreen;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
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
