import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
import { view } from "@risingstack/react-easy-state";

const SubmitPage = () => {
  setTimeout(function () {
    setGlobalState("currentPage", "submit");
  }, 100);

  console.log(globalState);

  return (
    <div>
      <h1>Submit Data Page!</h1>
    </div>
  );
};

export default view(SubmitPage);
