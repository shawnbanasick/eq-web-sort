import React from "react";
import styled from "styled-components";
import detectMobileBrowser from "../../utilities/detectMobileBrowser";

const LoadingScreen = () => {
  let isMobile = detectMobileBrowser();

  let isDisplayText;
  if (isMobile) {
    isDisplayText = <MobileTextDiv>Loading</MobileTextDiv>;
  } else {
    isDisplayText = <TextDiv>Loading</TextDiv>;
  }

  return (
    <Container>
      {isDisplayText}
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

const MobileTextDiv = styled.div`
  font-size: 44px;
  font-style: italic;
  font-weight: bold;
  align-self: center;
  margin-right: 30px;
  margin-top: 40px;
`;
