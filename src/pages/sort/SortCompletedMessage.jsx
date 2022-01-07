import React from "react";
import useStore from "../../globalState/useStore";

// eslint-disable-next-line react/button-has-type
/* eslint react/prop-types: 0 */

const getSortCompleted = (state) => state.sortCompleted;
const getSetDisplayPostsort = (state) => state.setDisplayPostsort;
const getSetDisplaySort = (state) => state.setDisplaySort;

const SortCompletedMessageBox = (props) => {
  // STATE
  const sortCompleted = useStore(getSortCompleted);
  const setDisplayPostsort = useStore(getSetDisplayPostsort);
  const setDisplaySort = useStore(getSetDisplaySort);

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

export default SortCompletedMessageBox;
