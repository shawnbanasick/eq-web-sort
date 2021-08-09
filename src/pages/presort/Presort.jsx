import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
// import getGlobalState from "../../globalState/getGlobalState";
// import ReactDOM from "react-dom";
// import "react-responsive-modal/styles.css";
// import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
// import styled from "styled-components";
// import ReactHtmlParser from "react-html-parser";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PresortModal from "./PresortModal";
import PresortDND from "./PresortDND";

setTimeout(function () {
  setGlobalState("currentPage", "presort");
}, 100);
console.log(globalState);

const PresortPage = () => {
  return (
    <React.Fragment>
      <h1>Presort Page!</h1>
      <PresortModal />
      <PresortDND />
    </React.Fragment>
  );
};

export default view(PresortPage);
