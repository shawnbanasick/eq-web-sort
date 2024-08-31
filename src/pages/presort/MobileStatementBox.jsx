import styled from "styled-components";

const MobileStatementBox = (props) => {
  return (
    <Container>
      <h1>{props.statement}</h1>
    </Container>
  );
};

export default MobileStatementBox;

const Container = styled.div`
  display: flex;
  align-self: center;
  justify-self: center;
  background-color: #e5e5e5;
  width: 80vw;
  height: 15vh;
  font-size: 1.1vh;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  text-align: center;
  padding: 5px;
  border: 1px solid black;
`;
