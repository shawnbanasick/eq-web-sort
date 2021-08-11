import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
import { view } from "@risingstack/react-easy-state";
import SurveyTextElement from "./SurveyTextElement";

const SurveyPage = () => {
  setTimeout(function () {
    setGlobalState("currentPage", "survey");
  }, 100);
  console.log(globalState);

  return (
    <div>
      <h1>Survey Page!</h1>
      <SurveyTextElement />
    </div>
  );
};

export default view(SurveyPage);
