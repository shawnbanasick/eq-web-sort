import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";

export function LandingPage() {
  setTimeout(function () {
    setGlobalState("currentPage", "landing");
  }, 100);
  console.log(globalState);
  return (
    <div>
      <h1>Landing Page!</h1>
    </div>
  );
}
