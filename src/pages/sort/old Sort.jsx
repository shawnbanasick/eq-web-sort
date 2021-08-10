import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";

export function SortPage() {
  setTimeout(function () {
    setGlobalState("currentPage", "sort");
    setGlobalState("progressScore", 50);
  }, 100);

  return (
    <div>
      <h1>Sort Page!</h1>
    </div>
  );
}
