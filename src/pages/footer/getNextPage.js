import getGlobalState from "../../globalState/getGlobalState";

const getNextPage = (currentPage) => {
  const configObj = getGlobalState("configObj");
  const showPostsort = configObj.showPostsort;
  const showSurvey = configObj.showSurvey;

  if (showPostsort === true && showSurvey === true) {
    if (currentPage === "landing") {
      return `/presort`;
    }
    if (currentPage === "presort") {
      return `/sort`;
    }
    if (currentPage === "sort") {
      return `/postsort`;
    }
    if (currentPage === "postsort") {
      return `/survey`;
    }
    if (currentPage === "survey") {
      return `/submit`;
    }
    if (currentPage === "submit") {
      return `/`;
    }
    return `/nopagefound`;
  }

  if (showPostsort === false && showSurvey === true) {
    if (currentPage === "landing") {
      return `/presort`;
    }
    if (currentPage === "presort") {
      return `/sort`;
    }
    if (currentPage === "sort") {
      return `/survey`;
    }
    if (currentPage === "survey") {
      return `/submit`;
    }
    if (currentPage === "submit") {
      return `/`;
    }
    return `/nopagefound`;
  }

  if (showPostsort === true && showSurvey === false) {
    if (currentPage === "landing") {
      return `/presort`;
    }
    if (currentPage === "presort") {
      return `/sort`;
    }
    if (currentPage === "sort") {
      return `/postsort`;
    }
    if (currentPage === "postsort") {
      return `/submit`;
    }
    if (currentPage === "submit") {
      return `/`;
    }
    return `/nopagefound`;
  }

  if (showPostsort === false && showSurvey === false) {
    if (currentPage === "landing") {
      return `/presort`;
    }
    if (currentPage === "presort") {
      return `/sort`;
    }
    if (currentPage === "sort") {
      return `/submit`;
    }
    if (currentPage === "submit") {
      return `/`;
    }
    return `/nopagefound`;
  }
};

export default getNextPage;
