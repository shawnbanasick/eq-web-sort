import React from "react";
import styled from "styled-components";
import useStore from "../../globalState/useStore";

/* eslint react/prop-types: 0 */

const getNumSortedStatements = (state) => state.numSortedStatements;
const getIsSortingCards = (state) => state.isSortingCards;

const NumberCardsSortedMessage = (props) => {
  // STATE
  const numSortedStatements = useStore(getNumSortedStatements);
  const isSortingCards = useStore(getIsSortingCards);

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

export default NumberCardsSortedMessage;

const CardsSortedDiv = styled.div``;
