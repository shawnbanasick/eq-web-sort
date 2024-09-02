const getNextPage = (currentPage, showPostsort, showSurvey, showConsent) => {
  // if (showPostsort === true && showSurvey === true) {
  if (currentPage === "consent") {
    if (showConsent === true) {
      return `/landing`;
    }
    return `/presort`;
  }
  if (currentPage === "landing") {
    return `/presort`;
  }
  if (currentPage === "presort") {
    return `/sort`;
  }
  if (currentPage === "sort") {
    if (showPostsort === true) {
      return `/postsort`;
    }
    if (showSurvey === true) {
      return `/survey`;
    }
    return `/submit`;
  }
  if (currentPage === "postsort") {
    if (showSurvey === true) {
      return `/survey`;
    }
    return `/submit`;
  }
  if (currentPage === "survey") {
    return `/submit`;
  }
  if (currentPage === "submit") {
    return `/`;
  }
  return `/nopagefound`;
};

export default getNextPage;
