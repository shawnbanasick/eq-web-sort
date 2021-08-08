import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";

export function SortPage() {
  setTimeout(function () {
    setGlobalState("currentPage", "sort");
  }, 100);
  console.log(globalState);

  return (
    <div>
      <h1>Sort Page!</h1>
    </div>
  );
}
