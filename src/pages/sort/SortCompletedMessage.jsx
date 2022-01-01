import React from "react";
import { view } from "@risingstack/react-easy-state";
import useStore from "../../globalState/useStore";

// eslint-disable-next-line react/button-has-type
/* eslint react/prop-types: 0 */

const SortCompletedMessageBox = (props) => {
  // STATE
  const sortCompleted = useStore((state) => state.sortCompleted);
  const setDisplayPostsort = useStore((state) => state.setDisplayPostsort);
  const setDisplaySort = useStore((state) => state.setDisplaySort);

  const handleClick = () => {
    console.log("clicked");
    setDisplayPostsort(true);
    setDisplaySort(false);
  };

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
