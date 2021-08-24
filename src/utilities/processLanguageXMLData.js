import setGlobalState from "../globalState/setGlobalState";

const processLanguageXMLData = (dataObject) => {
  try {
    const data = dataObject.language.item;

    const langObj = {};
    for (let i = 0; i < data.length; i++) {
      langObj[data[i]._attributes.id] = data[i]._text;
      setGlobalState([data[i]._attributes.id], data[i]._text);
    }
    // set default
    console.log(langObj.btnNext);
    localStorage.setItem("btnNext", langObj.btnNext);
    localStorage.setItem("fontSizeText", langObj.fontSize);

    return langObj;
  } catch (error) {
    console.log("there was a language import error");
  }
};

export default processLanguageXMLData;
