import React from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import SubmitSuccessModal from "./SubmitSuccessModal";
import SubmitFailureModal from "./SubmitFailureModal";

const SubmitResultsButton = (props) => {
  const langObj = getGlobalState("langObj");

  const handleClick = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(props.results, null, 2));

    window.firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        // Signed in..
        window.rootRef.push(props.results, function (error) {
          if (error) {
            // error action -  modal
            console.log("there was an error at rootRef level!");
            setGlobalState("triggerTransmissionFailModal", true);
          } else {
            // do success action - modal
            setGlobalState("triggerTransmissionOKModal", true);
            console.log("success! pushed to database");
          }
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log("there was an error at firebase level!");
        setGlobalState("triggerTransmissionFailModal", true);
        console.log(errorCode, errorMessage);
      });
    console.log("submission processed");
  };

  return (
    <React.Fragment>
      <SubmitSuccessModal />
      <SubmitFailureModal />
      <StyledButton tabindex="0" onClick={handleClick}>
        {langObj.btnTransfer}
      </StyledButton>
    </React.Fragment>
  );
};
export default view(SubmitResultsButton);

const StyledButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: 200px;
  height: 50px;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: ${({ theme, active }) =>
    active ? theme.secondary : theme.primary};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.focus};
  }
`;
