const decodeHTML = (string) => {
  try {
    let shouldDoReplace = string.includes("{{{");

    if (shouldDoReplace === true) {
      const replaceLeft = /{{{/gi;
      const replaceRight = /}}}/gi;
      const stringText2 = string.replace(replaceLeft, "<");
      const stringText3 = stringText2.replace(replaceRight, ">");
      return stringText3;
    } else {
      return string;
    }
  } catch (error) {
    console.log("There was an error decoding into HTML");
    console.error(error);
  }
};

export default decodeHTML;
