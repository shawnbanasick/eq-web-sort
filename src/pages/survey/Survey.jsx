import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";

export function SurveyPage() {
  setTimeout(function () {
    setGlobalState("currentPage", "survey");
  }, 100);
  console.log(globalState);

  return (
    <div>
      <h1>Survey Page!</h1>
    </div>
  );
}
