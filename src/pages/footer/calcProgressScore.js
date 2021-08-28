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

  let totalProgressScore;
  let additionalProgress;
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
    totalProgressScore = +additionalProgress + 20;
    return totalProgressScore;
  }
  if (currentPage === "sort") {
    totalProgressScore = +additionalProgressSort + 50;
    return totalProgressScore;
  }
  if (currentPage === "postsort") {
    totalProgressScore = 80;
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
