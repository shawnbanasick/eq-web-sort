const sanitizeString = (string) => {
  try {
    let shouldDoReplace = string.includes("<");
    let shouldDoReplace2 = string.includes(">");

    if (shouldDoReplace === true || shouldDoReplace2 === true) {
      const replaceLeft = /</gi;
      const replaceRight = />/gi;
      const stringText2 = string.replace(replaceLeft, "&lt");
      const stringText3 = stringText2.replace(replaceRight, "&gt");
      return stringText3;
    } else {
      return string;
    }
  } catch (error) {
    console.log("There was an error sanitizing User Input");
    console.error(error);
  }
};

export default sanitizeString;
