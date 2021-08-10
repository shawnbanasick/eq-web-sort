import React from "react";
// import styled from 'styled-components';
import { view } from "react-easy-state";
import state from "../state";

// eslint-disable-next-line react/button-has-type
/* eslint react/prop-types: 0 */

const handleClick = () => {
  console.log("clicked");
  state.setState({ displayPostsort: true, displaySort: false });
};

const SortCompletedMessageBox = props => {
  const sortCompleted = state.getState("sortCompleted");
  // const sortCompleted = localStorage.getItem("sortCompleted");
  console.log("TCL: sortCompleted", sortCompleted);

  if (sortCompleted === true) {
    return (
      <div>
        <p>{props.sortCompleteText}</p>
        <nav>
          <button type="button" onClick={handleClick}>
            Next
          </button>
        </nav>
      </div>
    );
  }
  return null;
};

export default view(SortCompletedMessageBox);
