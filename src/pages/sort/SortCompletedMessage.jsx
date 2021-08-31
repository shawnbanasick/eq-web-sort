import React from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

// eslint-disable-next-line react/button-has-type
/* eslint react/prop-types: 0 */

const handleClick = () => {
  console.log("clicked");
  setGlobalState("displayPostsort", true);
  setGlobalState("displaySort", false);
};

const SortCompletedMessageBox = (props) => {
  const sortCompleted = getGlobalState("sortCompleted");

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
