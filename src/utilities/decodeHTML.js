const decodeHTML = (string) => {
  try {
    const replaceLeft = /{{{/gi;
    const replaceRight = /}}}/gi;
    const stringText2 = string.replace(replaceLeft, "<");
    const stringText3 = stringText2.replace(replaceRight, ">");
    return stringText3;
  } catch (error) {
    console.error(error);
  }
};

export default decodeHTML;
