import styled from "styled-components";
import useStore from "../../globalState/useStore";
import { v4 as uuid } from "uuid";

const getMobilePresortResults = (state) => state.mobilePresortResults;

const MobilePreviousAssignmentBox = (props) => {
  let mobilePresortResults = useStore(getMobilePresortResults);
  let assessedStatements = mobilePresortResults.map((item, index) => {
    return (
      <InternalDiv key={uuid()} color={item.color}>
        {item.statement}
      </InternalDiv>
    );
  });

  return <Container>{assessedStatements}</Container>;
};

export default MobilePreviousAssignmentBox;

const Container = styled.div`
  display: flex;
  align-self: top;
  justify-self: center;
  margin-top: 10px;
  flex-direction: row;
  flex-wrap: wrap;

  background-color: #e5e5e5;
  width: 90vw;
  height: 32vh;
  font-size: 1.1vh;
  align-items: center;
  gap: 15px;

  justify-content: center;
  border-radius: 3px;
  text-align: center;
  overflow-x: none;
  overflow-y: auto;
  padding-bottom: 10px;
  padding-top: 10px;
  border-radius: 5px;
  border: 1px solid black;
`;

const InternalDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  width: 40vw;
  height: 10vh;
  font-size: 1.4vh;
  border-radius: 3px;
  text-align: center;
  outline: 1px solid black;
  padding: 5px;
`;
