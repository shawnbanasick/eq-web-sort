import React, { useEffect } from "react";
import { view } from "@risingstack/react-easy-state";
import cloneDeep from "lodash/cloneDeep";
import PresortModal from "./PresortModal";
import setGlobalState from "../../globalState/setGlobalState";
import getGlobalState from "../../globalState/getGlobalState";
import PresortDND from "./PresortDND";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";

let startTime;

const PresortPage = () => {
  useEffect(() => {
    setTimeout(() => {
      setGlobalState("currentPage", "presort");
      setGlobalState("progressScore", 20);
      localStorage.setItem("progressScore", `20`);
    }, 200);
  }, []);

  // calc time on page
  useEffect(() => {
    startTime = Date.now();
    return () => {
      calculateTimeOnPage(startTime, "presortPage", "presortPage");
    };
  }, []);

  const columnStatements = JSON.parse(localStorage.getItem("columnStatements"));
  const statements = cloneDeep(columnStatements.statementList);
  const cardFontSize = getGlobalState("cardFontSize");

  return (
    <React.Fragment>
      <PresortModal />
      <PresortDND statements={statements} cardFontSize={cardFontSize} />
    </React.Fragment>
  );
};

export default view(PresortPage);
