import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";

export function PresortPage() {
  setTimeout(function () {
    setGlobalState("currentPage", "presort");
  }, 100);
  console.log(globalState);

  return (
    <div>
      <h1>Presort Page!</h1>
    </div>
  );
}
