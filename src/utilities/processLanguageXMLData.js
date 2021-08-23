import setGlobalState from "../globalState/setGlobalState";

const processLanguageXMLData = (dataObject) => {
  try {
    const data = dataObject.language.item;

    const languageObject = {};
    for (let i = 0; i < data.length; i++) {
      languageObject[data[i]._attributes.id] = data[i]._text;
    }
    // set default
    console.log(languageObject.btnNext);
    localStorage.setItem("btnNext", languageObject.btnNext);
    localStorage.setItem("fontSizeText", languageObject.fontSize);
    setGlobalState("languageObject", languageObject);

    return languageObject;
  } catch (error) {
    console.log("there was a language import error");
  }
};

export default processLanguageXMLData;
