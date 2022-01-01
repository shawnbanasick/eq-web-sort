import styled from "styled-components";
import React from "react";
import { withRouter } from "react-router";
import { view } from "@risingstack/react-easy-state";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const LinkButton = (props) => {
  let goToNextPage;

  // STATE
  const configObj = useSettingsStore((state) => state.configObj);
  const presortFinished = useStore((state) => state.presortFinished);
  const setTriggerPresortPreventNavModal = useStore(
    (state) => state.setTriggerPresortPreventNavModal
  );
  const currentPage = useStore((state) => state.currentPage);
  const requiredAnswersObj = useStore((state) => state.requiredAnswersObj);
  const setCheckRequiredQuestionsComplete = useStore(
    (state) => state.setCheckRequiredQuestionsComplete
  );
  const setTriggerSurveyPreventNavModal = useStore(
    (state) => state.setTriggerSurveyPreventNavModal
  );
  const isSortingFinished = useStore((state) => state.isSortingFinished);
  const hasOverloadedColumn = useStore((state) => state.hasOverloadedColumn);
  const setTriggerSortPreventNavModal = useStore(
    (state) => state.setTriggerSortPreventNavModal
  );
  const setTriggerSortOverloadedColumnModal = useStore(
    (state) => state.setTriggerSortOverloadedColumnModal
  );

  const allowUnforcedSorts = configObj.allowUnforcedSorts;

  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props;

  const checkForNextPageConditions = (
    allowUnforcedSorts,
    isPresortFinished
  ) => {
    if (currentPage === "presort") {
      if (isPresortFinished === false) {
        setTriggerPresortPreventNavModal(true);
        return false;
      } else {
        return true;
      }
    }
    if (currentPage === "sort") {
      if (isSortingFinished === false) {
        // not finished sorting
        setTriggerSortPreventNavModal(true);
        return false;
      } else {
        // has finished sorting
        if (allowUnforcedSorts === true) {
          // unforced ok -> allow nav
          setTriggerSortPreventNavModal(false);
          return true;
        } else {
          // unforced not ok -> allow nav if no overloaded columns
          if (hasOverloadedColumn === true) {
            setTriggerSortOverloadedColumnModal(true);
            return false;
          } else {
            setTriggerSortPreventNavModal(false);
            return true;
          }
        }
      }
    }

    if (currentPage === "survey") {
      const checkArray = [];
      const keys = Object.keys(requiredAnswersObj);
      for (let i = 0; i < keys.length; i++) {
        if (requiredAnswersObj[keys[i]] === "no response") {
          checkArray.push("false");
        }
      }

      if (checkArray.length > 0) {
        // to turn on pink color for unanswered
        setCheckRequiredQuestionsComplete(true);
        setTriggerSurveyPreventNavModal(true);
        return false;
      } else {
        return true;
      }
    }

    // for pages without checks
    return true;
  };

  return (
    <NextButton
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event);
        goToNextPage = checkForNextPageConditions(
          allowUnforcedSorts,
          presortFinished
        );
        if (goToNextPage) {
          history.push(to);
        }
      }}
      tabindex="0"
    />
  );
};
export default view(withRouter(LinkButton));

const NextButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.5em;
  border-radius: 3px;
  text-decoration: none;
  width: auto;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  user-select: none;
  justify-content: center;
  background-color: ${({ theme, active }) =>
    active ? theme.secondary : theme.primary};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.focus};
  }
`;
