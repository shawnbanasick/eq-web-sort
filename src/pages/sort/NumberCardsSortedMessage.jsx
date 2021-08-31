import React from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
/* eslint react/prop-types: 0 */

const NumberCardsSortedMessage = (props) => {
  const numSortedStatements = getGlobalState("numSortedStatements");
  const isSortingCards = getGlobalState("isSortingCards");

  if (isSortingCards === true) {
    return (
      <CardsSortedDiv>
        <p>
          {numSortedStatements} of
          {" " + props.totalStatements} cards sorted
        </p>
      </CardsSortedDiv>
    );
  }
  return null;
};

export default view(NumberCardsSortedMessage);

const CardsSortedDiv = styled.div``;
