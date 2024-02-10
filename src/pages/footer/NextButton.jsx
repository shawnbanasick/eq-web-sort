import styled from "styled-components";
import React from "react";
import { withRouter } from "react-router";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import convertObjectToResults from "../sort/convertObjectToResults";
import getObjectValues from "lodash/values";

const getConfigObj = (state) => state.configObj;
const getPresortFinished = (state) => state.presortFinished;
const getSetTrigPrePrevNavModal = (state) =>
  state.setTriggerPresortPreventNavModal;
const getCurrentPage = (state) => state.currentPage;
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
const getColumnStatements = (state) => state.columnStatements;
const getSetResults = (state) => state.setResults;
const getSetShowPostsortCommentHighlighting = (state) =>
  state.setShowPostsortCommentHighlighting;
const getSetTriggerPostsortPreventNavModal = (state) =>
  state.setTriggerPostsortPreventNavModal;

const LinkButton = (props) => {
  let goToNextPage;

  // GLOBAL STATE
  const configObj = useSettingsStore(getConfigObj);
  const presortFinished = useStore(getPresortFinished);
  const setTriggerPresortPreventNavModal = useStore(getSetTrigPrePrevNavModal);
  const currentPage = useStore(getCurrentPage);
  const setCheckRequiredQuestionsComplete = useStore(getSetCheckReqQuesCompl);
  const setTriggerSurveyPreventNavModal = useStore(getSetTrigSurvPrevNavModal);
  const isSortingFinished = useStore(getIsSortingFinished);
  const hasOverloadedColumn = useStore(getHasOverloadedColumn);
  const setTriggerSortPreventNavModal = useStore(getSetTrigSortPrevNavModal);
  const setTriggerSortOverloadedColModal = useStore(getSetTrigSortOverColMod);
  const columnStatements = useSettingsStore(getColumnStatements);
  const setResults = useStore(getSetResults);
  const setShowPostsortCommentHighlighting = useStore(
    getSetShowPostsortCommentHighlighting
  );
  const setTriggerPostsortPreventNavModal = useStore(
    getSetTriggerPostsortPreventNavModal
  );

  const allowUnforcedSorts = configObj.allowUnforcedSorts;
  const postsortCommentsRequired = configObj.postsortCommentsRequired;

  // PERSISTENT STATE
  const sortColumns = JSON.parse(localStorage.getItem("sortColumns")) || [];

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
        if (sortColumns?.imagesList?.length === 0) {
          if (allowUnforcedSorts === true) {
            // persist results to localStorage
            setResults(sortResults1);
            // localStorage.setItem("resultsSort", JSON.stringify(sortResults1));
            setTriggerSortPreventNavModal(false);
            return true;
          } else {
            // if forced sort -> allow nav only if no overloaded columns
            if (hasOverloadedColumn === true) {
              setTriggerSortPreventNavModal(false);
              setTriggerSortOverloadedColModal(true);
              return false;
            } else {
              setResults(sortResults1);
              // persist results to localStorage
              // localStorage.setItem("resultsSort", JSON.stringify(sortResults1));
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
      let postsortCommentCardCount = +localStorage.getItem(
        "postsortCommentCardCount"
      );
      const required1 =
        getObjectValues(
          JSON.parse(localStorage.getItem("HC-requiredCommentsObj"))
        ) || [];
      const required2 =
        getObjectValues(
          JSON.parse(localStorage.getItem("HC2-requiredCommentsObj"))
        ) || [];
      const required3 =
        getObjectValues(
          JSON.parse(localStorage.getItem("LC-requiredCommentsObj"))
        ) || [];
      const required4 =
        getObjectValues(
          JSON.parse(localStorage.getItem("LC2-requiredCommentsObj"))
        ) || [];

      const checkArray2 = [
        ...required1,
        ...required2,
        ...required3,
        ...required4,
      ];

      if (
        checkArray2.includes("false") ||
        checkArray2.includes(false) ||
        checkArray2.length < postsortCommentCardCount
      ) {
        // answers required in configObj
        if (postsortCommentsRequired === true) {
          setShowPostsortCommentHighlighting(true);
          setTriggerPostsortPreventNavModal(true);
          return false;
        }
        return true;
      } else {
        return true;
      }
    }

    if (currentPage === "survey") {
      let resultsSurvey = JSON.parse(localStorage.getItem("resultsSurvey"));
      let values = getObjectValues(resultsSurvey);
      let includesNoResponse = values.includes("no-*?*-response");
      if (includesNoResponse) {
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
