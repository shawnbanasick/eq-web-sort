import getGlobalState from "../../globalState/getGlobalState";

const calcProgressScore = (
  currentPage,
  additionalProgress1,
  additionalProgressSort
) => {
  const additionalProgressState = +getGlobalState("progressScoreAdditional");
  const additionalProgressStateSort = +getGlobalState(
    "progressScoreAdditionalSort"
  );
  const configObj = getGlobalState("configObj");

  let adjustmentValue1 = 20;
  let adjustmentValue2 = 50;
  let adjustmentValue3 = 80;
  if (configObj.showPostsort === false && configObj.showSurvey === true) {
    adjustmentValue1 = 30;
    adjustmentValue2 = 60;
  }
  if (configObj.showPostsort === true && configObj.showSurvey === false) {
    adjustmentValue1 = 30;
    adjustmentValue2 = 60;
    adjustmentValue3 = 90;
  }
  if (configObj.showPostsort === false && configObj.showSurvey === false) {
    adjustmentValue1 = 30;
    adjustmentValue2 = 60;
  }

  let totalProgressScore;
  let additionalProgress = 0;
  if (additionalProgress1 !== additionalProgressState) {
    additionalProgress = additionalProgressState;
  }

  if (additionalProgressSort !== additionalProgressStateSort) {
    additionalProgressSort = additionalProgressStateSort;
  }

  if (currentPage === "landing") {
    totalProgressScore = 10;
    return totalProgressScore;
  }
  if (currentPage === "presort") {
    totalProgressScore = additionalProgress + adjustmentValue1;
    return totalProgressScore;
  }
  if (currentPage === "sort") {
    totalProgressScore = +additionalProgressSort + adjustmentValue2;
    return totalProgressScore;
  }
  if (currentPage === "postsort") {
    totalProgressScore = adjustmentValue3;
    return totalProgressScore;
  }
  if (currentPage === "survey") {
    totalProgressScore = 90;
    return totalProgressScore;
  }
  if (currentPage === "submit") {
    totalProgressScore = 100;
    return totalProgressScore;
  }
};

export default calcProgressScore;
