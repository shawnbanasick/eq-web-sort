import styled from "styled-components";
import React from "react";
import { withRouter } from "react-router";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import convertObjectToResults from "../sort/convertObjectToResults";

const getConfigObj = (state) => state.configObj;
const getPresortFinished = (state) => state.presortFinished;
const getSetTrigPrePrevNavModal = (state) =>
  state.setTriggerPresortPreventNavModal;
const getCurrentPage = (state) => state.currentPage;
const getRequiredAnswersObj = (state) => state.requiredAnswersObj;
const getSetCheckReqQuesCompl = (state) =>
  state.setCheckRequiredQuestionsComplete;
const getSetTrigSurvPrevNavModal = (state) =>
  state.setTriggerSurveyPreventNavModal;
const getIsSortingFinished = (state) => state.isSortingFinished;
const getHasOverloadedColumn = (state) => state.hasOverloadedColumn;
const getSetTrigSortPrevNavModal = (state) =>
  state.setTriggerSortPreventNavModal;
const getSetTrigSortOverColMod = (state) =>
  state.setTriggerSortOverloadedColumnModal;
const getStatementsObj = (state) => state.statementsObj;
const getColumnStatements = (state) => state.columnStatements;
const getSetResults = (state) => state.setResults;
const getPostsortCommentCheckObj = (state) => state.postsortCommentCheckObj;
const getSetShowPostsortCommentHighlighting = (state) =>
  state.setShowPostsortCommentHighlighting;
const getSetTriggerPostsortPreventNavModal = (state) =>
  state.setTriggerPostsortPreventNavModal;

const LinkButton = (props) => {
  let goToNextPage;

  // STATE
  const configObj = useSettingsStore(getConfigObj);
  const presortFinished = useStore(getPresortFinished);
  const setTriggerPresortPreventNavModal = useStore(getSetTrigPrePrevNavModal);
  const currentPage = useStore(getCurrentPage);
  const requiredAnswersObj = useStore(getRequiredAnswersObj);
  const setCheckRequiredQuestionsComplete = useStore(getSetCheckReqQuesCompl);
  const setTriggerSurveyPreventNavModal = useStore(getSetTrigSurvPrevNavModal);
  const isSortingFinished = useStore(getIsSortingFinished);
  const hasOverloadedColumn = useStore(getHasOverloadedColumn);
  const setTriggerSortPreventNavModal = useStore(getSetTrigSortPrevNavModal);
  const setTriggerSortOverloadedColModal = useStore(getSetTrigSortOverColMod);
  const statementsObj = useSettingsStore(getStatementsObj);
  const columnStatements = useSettingsStore(getColumnStatements);
  const setResults = useStore(getSetResults);
  const postsortCommentCheckObj = useStore(getPostsortCommentCheckObj);
  const setShowPostsortCommentHighlighting = useStore(
    getSetShowPostsortCommentHighlighting
  );
  const setTriggerPostsortPreventNavModal = useStore(
    getSetTriggerPostsortPreventNavModal
  );

  const allowUnforcedSorts = configObj.allowUnforcedSorts;
  const postsortCommentsRequired = configObj.postsortCommentsRequired;

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
    // *** ReCalc Results ***
    let sortResults1 = convertObjectToResults(columnStatements);

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
        // check to see if finished, but had sorting registration error
        if (statementsObj.columnStatements.statementList.length === 0) {
          if (allowUnforcedSorts === true) {
            // unforced ok -> allow nav
            setResults(sortResults1);
            setTriggerSortPreventNavModal(false);
            return true;
          } else {
            // unforced not ok -> allow nav if no overloaded columns
            if (hasOverloadedColumn === true) {
              setTriggerSortPreventNavModal(false);
              setTriggerSortOverloadedColModal(true);
              return false;
            } else {
              setResults(sortResults1);
              setTriggerSortPreventNavModal(false);
              return true;
            }
          }
        } else {
          // not finished sorting
          setTriggerSortPreventNavModal(true);
          return false;
        }
      } else {
        // has finished sorting
        if (allowUnforcedSorts === true) {
          // unforced ok -> allow nav
          setTriggerSortPreventNavModal(false);
          return true;
        } else {
          // unforced not ok -> allow nav if no overloaded columns
          if (hasOverloadedColumn === true) {
            setTriggerSortPreventNavModal(false);
            setTriggerSortOverloadedColModal(true);
            return false;
          } else {
            setTriggerSortPreventNavModal(false);
            return true;
          }
        }
      }
    }

    if (currentPage === "postsort") {
      const requiredCommentsObj = JSON.parse(
        localStorage.getItem("requiredCommentsObj")
      );

      const checkArray2 = [];
      const keyArray = Object.keys(requiredCommentsObj);
      keyArray.forEach((key) => {
        if (
          requiredCommentsObj[key] === false ||
          requiredCommentsObj[key] === "false"
        ) {
          checkArray2.push("false");
        }
      });
      if (
        postsortCommentsRequired === true ||
        postsortCommentsRequired === "true"
      ) {
        if (checkArray2.length > 0 || checkArray2.includes("false")) {
          // answers required in configObj
          setShowPostsortCommentHighlighting(true);
          setTriggerPostsortPreventNavModal(true);
          return false;
        } else {
          return true;
        }
      } else {
        return true;
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
      console.log("next Button check array", checkArray);
      if (checkArray.length > 0) {
        // to turn on yellow color for unanswered
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
export default withRouter(LinkButton);

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
